import React, { useState, useEffect } from "react";
import "./App.css";
import PersianDate from "./components/PersianDate";
import { useDispatch, useSelector } from "react-redux";
import getWeatherInfo from "./redux/weather/weatherAction";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Weather() {
  const { loading, data, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleGetWeather = (e) => {
    e.preventDefault();
    dispatch(getWeatherInfo(query));
    setQuery("");
  };

  const [backMode, setBackMode] = useState("usual-1");

  useEffect(() => {
    if (!data.main) {
      return;
    }
    let temp = data.main.temp;
    if (temp < -20) {
      setBackMode("cold-1");
    } else if (temp < -15) {
      setBackMode("cold-2");
    } else if (temp < -10) {
      setBackMode("cold-3");
    } else if (temp < -5) {
      setBackMode("cold-4");
    } else if (temp < 0) {
      setBackMode("cold-5");
    } else if (temp < 5) {
      setBackMode("usual-1");
    } else if (temp < 10) {
      setBackMode("usual-2");
    } else if (temp < 15) {
      setBackMode("usual-3");
    } else if (temp < 20) {
      setBackMode("usual-4");
    } else if (temp < 25) {
      setBackMode("usual-5");
    } else if (temp < 30) {
      setBackMode("warm-1");
    } else if (temp < 35) {
      setBackMode("warm-2");
    } else if (temp < 40) {
      setBackMode("warm-3");
    } else if (temp < 45) {
      setBackMode("warm-4");
    } else {
      setBackMode("warm-5");
    }
  }, [data]);

  return (
    <div className={`back_${backMode}`}>
      <div className="icon">
        <h1 className="icon-text">
          Weather<span>App</span>
        </h1>
        <h1>
          <i className="bi bi-cloud-sun-fill"></i>
        </h1>
      </div>

      <div className="input-container">
        <form onSubmit={handleGetWeather}>
          <input
            type="text"
            className="input"
            placeholder={data.name || "جستجوی شهر یا کشور"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="text-span">
        <PersianDate />
      </div>

      {loading ? (
        <div className="spinner">
          <span className="spinner-bootstrap">
            <Spinner animation="border" variant="danger" />
          </span>
        </div>
      ) : data.main ? (
        <>
          <div className="degree container">
            <span className="degree-span text-center col-12">
              <span>Temperature</span>
              <span>{Math.round(data.main.temp)}°C</span>
            </span>
            <span className="degree-span row">
              <div className="col-3">
                <span>Pressure</span>
                <span>{Math.round(data.main.pressure)}°C</span>
              </div>
              <div className="col-3">
                <span>Humidity</span>
                <span>{Math.round(data.main.humidity)}°C</span>
              </div>
              <div className="col-3">
                <span>Degree</span>
                <span>{Math.round(data.wind.deg)}°C</span>
              </div>
              <div className="col-3">
                <span>Wind Speed</span>
                <span>{Math.round(data.wind.speed)}°C</span>
              </div>
            </span>
          </div>

          <div className="weather">
            <h1>{data.weather[0].main}</h1>
            <h1>{data.weather[0].description}</h1>
          </div>
        </>
      ) : error ? (
        <h3 className="h3">نام شهر را به درستی وارد کنید</h3>
      ) : (
        <h3 className="h3">مکان مورد نظر را جستجو کنید</h3>
      )}
    </div>
  );
}

export default Weather;
