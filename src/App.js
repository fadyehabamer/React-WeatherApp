import React, { Component } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Form from './components/Form'
import Weather from './components/Weather'

import './App.css'
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
    const country = e.target.elements.country.value
    const city = e.target.elements.city.value
    // console.log(country , city);
    const ApiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=93f2fce913853464e6211aafd3aa5678`);
    const ApiDataJson = await ApiData.json()
    console.log(ApiDataJson.cod);

    if (ApiDataJson.cod === 200) {
      if (country && city) {
        this.setState({
          temp: ApiDataJson.main.temp,
          city: ApiDataJson.name,
          humidity: ApiDataJson.main.humidity,
          type: ApiDataJson.weather[0].main,
          cod: ApiDataJson.cod
        })
      }
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
