# 🌤 Tempest — Weather Forecast App

**Live Demo:** [https://tempest-weather.vercel.app/](https://tempest-weather.vercel.app/)

Tempest is a weather app built with React and TypeScript. It provides detailed weather forecasts with intuitive visuals, supporting both location-based forecasts and manual location searches.

This project was developed as a portfolio piece to demonstrate practical frontend skills including state management, responsive design, API integration, and component-based architecture.

---

## ✨ Features

- **Live Weather Forecasts** — Powered by the OpenWeather API
- **Location-based Weather** — Prompt to use browser location, or search any city manually
- **Daily Highs, Lows & Conditions** — With clear iconography and temperature breakdown
- **Responsive UI** — Optimized for mobile, tablet, and desktop
- **Dark Mode Support**
- **Elegant Visuals** — Built with modern UI libraries and subtle animations

---

## 🛠 Tech Stack

This project makes use of:

- **React** — Functional components with hooks
- **TypeScript** — Type safety and developer tooling
- **TanStack Query** — Efficient data fetching and caching
- **Shadcn UI** — Accessible, headless UI components
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Simple, customizable charts for weather trends

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tempest.git
cd tempest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You will need a free API key from [OpenWeather](https://home.openweathermap.org/):

1. Sign up or log in to OpenWeather.
2. Create an API key from your dashboard.

Create a `.env` file in the project root with the following:

```bash
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

**Note:** Do not commit your API key publicly.

### 4. Run the Development Server

```bash
npm run dev
```

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # Global context (theme, search state)
├── hooks/            # Custom React hooks
├── pages/            # Main route pages
├── utils/            # Helper functions
├── App.tsx           # Root application logic
└── main.tsx          # App entry point
```

---

## 🌍 API Usage

This project uses [OpenWeather's One Call API](https://openweathermap.org/api/one-call-3) to retrieve weather data, including:

- Current conditions
- Daily forecasts
- Temperature highs/lows
- Humidity and wind details

---

## 🙌 Why This Project?

Tempest was created to showcase:

- Real-world API integration
- Clean, accessible, and maintainable component architecture
- Modern frontend tools (React, TypeScript, TanStack Query, shadcn)
- Responsive, mobile-friendly design
- Data visualization with Recharts

---

## 📢 Notes

- Location permissions are optional — users can search manually if preferred.

---
