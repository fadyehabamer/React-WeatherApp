<p align="center">

  <img src="img.jpeg"/>

</p>

## OpenWeatherMap API key

The app reads its key from the `REACT_APP_OPENWEATHER_API_KEY` environment variable at build time.

```sh
cp .env.example .env
# edit .env and set REACT_APP_OPENWEATHER_API_KEY=<your key>
npm start
```

For deployments (e.g. Vercel), set `REACT_APP_OPENWEATHER_API_KEY` in the project's environment variables and redeploy.

> **Note:** `REACT_APP_*` variables are inlined into the JavaScript bundle, so the key is still visible to anyone who opens the app. It is kept out of the source code, not secret. Restrict it in the OpenWeatherMap dashboard, and rotate it if it leaks. A key that was committed before remains in the git history and should be rotated.
