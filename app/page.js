import styles from "./page.module.css";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastGrid from "./components/ForecastGrid";
import ErrorCard from "./components/ErrorCard";
import { getWeatherData } from "./lib/weather";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const city = params?.city || "";
  const units = params?.units || "metric";

  let current = null;
  let forecast = null;
  let error = null;

  if (city) {
    try {
      const data = await getWeatherData(city, units);
      current = data.current;
      forecast = data.forecast;
    } catch (e) {
      error = e.message;
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Weather</h1>
      <p className={styles.subtitle}>
        Search any city for current weather &amp; 5-day forecast
      </p>
      <SearchBar defaultCity={city} defaultUnits={units} />
      {error && <ErrorCard message={error} />}
      {current && <CurrentWeather data={current} units={units} />}
      {forecast && forecast.length > 0 && (
        <ForecastGrid days={forecast} units={units} />
      )}
    </main>
  );
}
