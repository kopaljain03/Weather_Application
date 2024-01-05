import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cities, setcities] = useState([]);
  const [temp, settemp] = useState({});
  function handleChange(e) {
    const city_comma = e.target.value;
    const city_split = city_comma.split(",");
    setcities({ cities: city_split });
  }
  function handleSubmit() {
    console.log(cities);
    axios
      .post("http://localhost:3000/getWeather", cities)
      .then((res) => {
        settemp(res.data.weather);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <h2>Weather API</h2>
      <h4>Write "," separated cities : </h4>

      <input
        type="text"
        name="cities"
        id="cities"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      <br />
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
      <br />
      <ul>
        {Object.entries(temp).map(([city, temperature]) => (
          <li key={city}>
            {city}: {temperature}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
