"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ defaultCity = "", defaultUnits = "metric" }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [city, setCity] = useState(defaultCity);
  const [units, setUnits] = useState(defaultUnits);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;

    startTransition(() => {
      router.push(`/?city=${encodeURIComponent(trimmed)}&units=${units}`);
    });
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city name (e.g. London, New York,US)'
          required
          autoFocus
          className={styles.input}
        />
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className={styles.select}
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
