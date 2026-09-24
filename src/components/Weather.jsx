import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function Weather(props) {
  const { city, temp, humidity, type } = props
  return (

    <div className='weather' aria-live='polite'>
      <h2>
        Data Searched
      </h2>
      {city &&
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            city &&

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationCityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="City" secondary={city} />
            </ListItem>
          }


          {temp != null &&

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThermostatIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Temperature" secondary={`${Math.round(temp)} °C`} />
            </ListItem>
          }

          {humidity != null &&
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <OpacityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Humidity" secondary={`${humidity}%`} />
            </ListItem>
          }

          {
            type &&
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WbSunnyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Description" secondary={type} />
            </ListItem>
          }

        </List>
      }
    </div>


  )
}