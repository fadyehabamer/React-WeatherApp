import React from 'react'
import { TextField, Button } from '@mui/material'

export default function Form(props) {
  // console.log(props)
  return (
    <form onSubmit={props.getWeather}>
      <TextField id="country" label="Country (optional)" variant="outlined"
        inputProps={{
          autoComplete: "off",
          name: "country",
          
        }} />
      {/* =============================================== */}
      <TextField id="city" label="City" variant="outlined" required
        inputProps={{
          autoComplete: "off",
          name: "city",
          
        }} />
      {/* =============================================== */}

      <Button type="submit" variant="outlined">Search</Button>
    </form>
  )

}

