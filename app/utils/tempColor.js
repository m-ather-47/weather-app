export function getTempColor(temp, units = "metric") {
  const celsius = units === "imperial" ? ((temp - 32) * 5) / 9 : temp;

  if (celsius <= 0) return "#3b82f6";
  if (celsius <= 10) return "#06b6d4";
  if (celsius <= 20) return "#22c55e";
  if (celsius <= 30) return "#eab308";
  return "#ef4444";
}
