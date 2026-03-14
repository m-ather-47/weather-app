const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherData(city, units = "metric") {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("Server configuration error: missing API key.");
  }

  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: units,
  });

  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?${params}`, { next: { revalidate: 300 } }),
    fetch(`${BASE_URL}/forecast?${params}`, { next: { revalidate: 300 } }),
  ]);

  if (currentRes.status === 401 || forecastRes.status === 401) {
    throw new Error("Invalid API key. Check your OPENWEATHER_API_KEY.");
  }
  if (currentRes.status === 404 || forecastRes.status === 404) {
    throw new Error(
      `City "${city}" not found. Check the spelling or try adding a country code (e.g., "London,GB").`
    );
  }
  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("Weather API error. Please try again later.");
  }

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  return {
    current: currentData,
    forecast: aggregateDaily(forecastData.list),
  };
}

function aggregateDaily(forecastList) {
  const days = {};

  for (const entry of forecastList) {
    const date = entry.dt_txt.split(" ")[0];

    if (!days[date]) {
      days[date] = {
        date,
        temps: [],
        humidity: [],
        wind: [],
        conditions: [],
        icons: [],
      };
    }

    days[date].temps.push(entry.main.temp);
    days[date].humidity.push(entry.main.humidity);
    days[date].wind.push(entry.wind.speed);
    days[date].conditions.push(entry.weather[0].main);
    days[date].icons.push(entry.weather[0].icon);
  }

  return Object.values(days).map((info) => {
    const condition = mode(info.conditions);
    const icon = mode(info.icons);
    const dt = new Date(info.date + "T00:00:00");

    return {
      date: info.date,
      dateFmt: dt.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      tempHigh: round1(Math.max(...info.temps)),
      tempLow: round1(Math.min(...info.temps)),
      humidity: Math.round(avg(info.humidity)),
      wind: round1(avg(info.wind)),
      condition,
      icon,
    };
  });
}

function mode(arr) {
  const freq = {};
  let maxCount = 0;
  let result = arr[0];
  for (const val of arr) {
    freq[val] = (freq[val] || 0) + 1;
    if (freq[val] > maxCount) {
      maxCount = freq[val];
      result = val;
    }
  }
  return result;
}

function avg(arr) {
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

function round1(n) {
  return Math.round(n * 10) / 10;
}
