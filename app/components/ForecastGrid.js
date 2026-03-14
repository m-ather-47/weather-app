import Image from "next/image";
import styles from "./ForecastGrid.module.css";
import { getTempColor } from "../utils/tempColor";

export default function ForecastGrid({ days, units }) {
  const tempUnit = units === "imperial" ? "°F" : "°C";
  const speedUnit = units === "imperial" ? "mph" : "m/s";

  return (
    <>
      <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {days.map((day) => (
          <div key={day.date} className={styles.forecastCard}>
            <p className={styles.forecastDay}>{day.dateFmt}</p>
            <Image
              className={styles.weatherIconSm}
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.condition}
              width={60}
              height={60}
            />
            <p className={styles.forecastCondition}>{day.condition}</p>
            <p className={styles.forecastTemps}>
              <span
                className={styles.tempHigh}
                style={{ color: getTempColor(day.tempHigh, units) }}
              >
                {day.tempHigh}
                {tempUnit}
              </span>
              <span className={styles.tempLow}>
                {day.tempLow}
                {tempUnit}
              </span>
            </p>
            <div className={styles.forecastDetails}>
              <span>{day.humidity}% humidity</span>
              <span>
                {day.wind} {speedUnit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
