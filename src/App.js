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
    describtion: ''
  }

  getWeather = async (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value
    const city = e.target.elements.city.value
    // console.log(country , city);
    const ApiData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=e36ed364400282e43250b6c4c0274d44`);
    const ApiDataJson = await ApiData.json()
    console.log(ApiDataJson.weather[0].main);


    if (country && city) {
      this.setState({
        temp: ApiDataJson.main.temp,
        city: ApiDataJson.name,
        humidity: ApiDataJson.main.humidity,
        type: ApiDataJson.weather[0].main

      })
    } else {
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