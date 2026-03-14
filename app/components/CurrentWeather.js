import Image from "next/image";
import styles from "./CurrentWeather.module.css";
import { getTempColor } from "../utils/tempColor";

function capitalize(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CurrentWeather({ data, units }) {
  const weather = data.weather[0];
  const main = data.main;
  const wind = data.wind;
  const tempUnit = units === "imperial" ? "°F" : "°C";
  const speedUnit = units === "imperial" ? "mph" : "m/s";
  const visibility = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : "N/A";

  return (
    <div className={styles.currentCard}>
      <div className={styles.currentHeader}>
        <div>
          <h2 className={styles.cityName}>
            {data.name}, {data.sys.country}
          </h2>
          <p className={styles.weatherDesc}>
            {capitalize(weather.description)}
          </p>
        </div>
        <Image
          className={styles.weatherIconLg}
          src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt={weather.description}
          width={100}
          height={100}
        />
      </div>

      <div
        className={styles.currentTemp}
        style={{ color: getTempColor(main.temp, units) }}
      >
        {Math.round(main.temp * 10) / 10}
        {tempUnit}
      </div>

      <p className={styles.feelsLike}>
        Feels like {Math.round(main.feels_like * 10) / 10}
        {tempUnit}
      </p>

      <div className={styles.detailsGrid}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Humidity</span>
          <span className={styles.detailValue}>{main.humidity}%</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Wind</span>
          <span className={styles.detailValue}>
            {wind.speed} {speedUnit}
          </span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Pressure</span>
          <span className={styles.detailValue}>{main.pressure} hPa</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Visibility</span>
          <span className={styles.detailValue}>{visibility}</span>
        </div>
      </div>
    </div>
  );
}
