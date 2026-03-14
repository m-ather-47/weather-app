# Weather App

A beautiful weather web application with real-time data and 5-day forecasts.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-API-orange)

## Features

- Current weather with OpenWeather icons
- 5-day forecast in responsive card grid
- Dark glassmorphism UI design
- Color-coded temperatures
- Metric and imperial unit support
- Responsive layout for mobile and desktop

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# Install dependencies
npm install
```

## Setup

1. Get a free API key at [openweathermap.org](https://openweathermap.org/api)
2. Create a `.env.local` file in the project root:

```
OPENWEATHER_API_KEY=your_api_key_here
```

## Usage

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000`

## Tech Stack

- **Next.js** - React framework with App Router & Server Components
- **React** - UI library
- **CSS Modules** - Scoped component styling
- **OpenWeather API** - Weather data provider

## License

MIT
