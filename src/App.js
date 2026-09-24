import React, { Component } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Form from './components/Form'
import Weather from './components/Weather'

import './App.css'

// OpenWeatherMap key, injected at build time from .env (see .env.example).
// Anything bundled into a front-end app is visible to users, so restrict
// and rotate this key in the OpenWeatherMap dashboard.
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

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
    const ApiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
    const ApiDataJson = await ApiData.json()

    if (ApiDataJson.cod === 200) {
      this.setState({
        temp: ApiDataJson.main.temp,
        city: ApiDataJson.name,
        humidity: ApiDataJson.main.humidity,
        type: ApiDataJson.weather[0].main,
        cod: ApiDataJson.cod
      })
    }
    else {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm()
        }
      })
        .then(() => {
          return MySwal.fire(`<p> How to Search with Invalid Inputs, HA ?</p>`)
        })
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
