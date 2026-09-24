import React, { Component } from 'react'

import Swal from 'sweetalert2'

import Form from './components/Form'
import Weather from './components/Weather'

import './App.css'

// OpenWeatherMap key, injected at build time from .env (see .env.example).
// Anything bundled into a front-end app is visible to users, so restrict
// and rotate this key in the OpenWeatherMap dashboard.
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

// `text` (not `html`) so user input in the message is never parsed as HTML
const showError = (text) => Swal.fire({ icon: 'error', title: 'Search failed', text })

export default class App extends Component {

  state = {
    temp: '',
    city: '',
    humidity: '',
    describtion: '',
    code: ''
  }

  getWeather = async (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value.trim()
    const city = e.target.elements.city.value.trim()
    if (!city) return
    // country is optional: "q=London" and "q=London,GB" are both valid
    const params = new URLSearchParams({
      q: [city, country].filter(Boolean).join(','),
      units: 'metric',
      appid: API_KEY
    })
    if (!API_KEY) {
      showError('The app is missing its OpenWeatherMap API key (REACT_APP_OPENWEATHER_API_KEY).')
      return
    }

    let response, data
    try {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`)
      data = await response.json()
    } catch {
      showError('Could not reach the weather service. Check your connection and try again.')
      return
    }

    if (response.ok && data.main && data.weather && data.weather.length) {
      this.setState({
        temp: data.main.temp,
        city: data.name,
        humidity: data.main.humidity,
        type: data.weather[0].main,
        cod: data.cod
      })
    } else if (response.status === 404) {
      showError(`No weather data found for "${[city, country].filter(Boolean).join(', ')}". Check the spelling of the city and country.`)
    } else if (response.status === 401) {
      showError('The weather service rejected the API key.')
    } else if (response.status === 429) {
      showError('Too many requests. Please wait a minute and try again.')
    } else {
      showError((data && data.message) || `Weather service error (HTTP ${response.status}).`)
    }
  }

  render() {
    return (
      <>
        <Form getWeather={this.getWeather} />
        <Weather
          city={this.state.city}
          temp={this.state.temp}
          humidity={this.state.humidity}
          type={this.state.type}
        />
      </>
    )
  }
}
