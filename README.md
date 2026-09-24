<p align="center">

  <img src="img.jpeg"/>

</p>

# React Weather App

Search the current weather for any city (and, optionally, its country) using the [OpenWeatherMap Current Weather API](https://openweathermap.org/current). Built with Create React App, MUI and SweetAlert2.

Live demo: https://react-weatherapp-fea.vercel.app/

Shows the city, temperature (°C), humidity and conditions. It displays an error dialog for unknown cities, rejected API keys, rate limits and network failures.

## Getting started

Requires Node.js (tested with v24) and an OpenWeatherMap API key (see below).

```sh
npm ci
cp .env.example .env   # then add your key
npm start              # dev server on http://localhost:3000
```

| Script          | What it does                          |
| --------------- | ------------------------------------- |
| `npm start`     | Start the development server          |
| `npm test`      | Run the Jest / Testing Library tests  |
| `npm run build` | Create a production build in `build/` |

## OpenWeatherMap API key

The app reads its key from the `REACT_APP_OPENWEATHER_API_KEY` environment variable at build time.

```sh
cp .env.example .env
# edit .env and set REACT_APP_OPENWEATHER_API_KEY=<your key>
npm start
```

For deployments (e.g. Vercel), set `REACT_APP_OPENWEATHER_API_KEY` in the project's environment variables and redeploy.

> **Note:** `REACT_APP_*` variables are inlined into the JavaScript bundle, so the key is still visible to anyone who opens the app. It is kept out of the source code, not secret. Restrict it in the OpenWeatherMap dashboard, and rotate it if it leaks. A key that was committed before remains in the git history and should be rotated.

## License

[MIT](LICENSE)
