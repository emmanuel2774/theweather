import { useState } from "react"
import "./Weather.css"
import axios from "axios"
import {toast} from "react-toastify"


const Weather = () => {
  const [data, setData] = useState({})
  const [Location, setLocation] = useState("")
  const API_KEY = process.env.REACT_APP_API_KEY 

  var background = null

  var infoBar = null
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=imperial&appid=${API_KEY}`

  const handleChange = (e) => {
    setLocation(e.target.value)
  }


  // const searchLocation = (e) => {
  //   if(e.key ==="Enter" ){
  //     axios.get(url).then((response) => {
  //       setData(response.data)
  //       console.log(response.data);
  //     }).catch((error) => {
  //       console.log("Something went wrong")
  //     })
  //   }
  // }

  const searchLocation =(e) => {
    e.preventDefault()

    if(Location == ""){
      toast.error("Enter Something")
    }

    axios.get(url).then((response) => {
            setData(response.data)
          }).catch((error) => {
            if(error.response.data.cod == 404) {
              toast.error("Invalid Location")
             }
           })
           

          
      
  }

  if(data.weather){
    data.weather[0].main == "Clouds" ? background ="Cloudy" : null;
    data.weather[0].main == "Clear" ? background ="Clear" : null;
    data.weather[0].main == "Rain" ? background ="Rainy" : null;
    data.weather[0].main == "Snowy" ? background ="Snowy" : null;

  }else {
    background = "Default"
  }


 data.main ? infoBar = "additional-info-bar" : ""

  return (
    <div className={background}>
        <div className="form">
          <form onSubmit={searchLocation}>
          <input onChange={handleChange} className="input" type="text" 
            value={Location} placeholder='Enter Location'/>
          </form>
        </div>
        <div className="weather-info-container">
          {data.weather ? <h2>{data.weather[0].main}</h2> : null}
          {data.main ? <p>{data.main.temp}°F</p> : null }
          </div>
          
          <div className={infoBar}>

            {data.main ?  <div className="additional-info">
           <h2>{data.main.humidity}%</h2> 
              <p>Humidity</p>
            </div> : null }

            {data.wind ?   
            <div className="additional-info">
              <h2>{data.wind.speed} MPH</h2>
              <p>Wind Speed</p>
            </div>
             : null }
          </div>

          <div className="footer">
            <p>&copy; 2022 Emmy.js</p>
          </div>
    </div>
  )
}

export default Weather