import React from 'react'
import { TextField, Button } from '@mui/material'

export default function Form(props) {
  // console.log(props)
  return (
    <form onSubmit={props.getWeather}>
      <TextField id="outlined-basic" label="Country" variant="outlined"
        inputProps={{
          autoComplete: "off",
          name: "country",
          
        }} />
      {/* =============================================== */}
      <TextField id="outlined-basic" label="City" variant="outlined"
        inputProps={{
          autoComplete: "off",
          name: "city",
          
        }} />
      {/* =============================================== */}

      <Button type="submit" variant="outlined">Search</Button>
    </form>
  )

}

