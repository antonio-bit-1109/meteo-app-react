import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import MyNavBarComponent from "./components/MyNavBarComponent";
import { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import DetailsSIngleCity from "./components/DetailsSIngleCity";

const App = () => {
    const [cityname, setCityname] = useState("");
    /*     const [coordinates, setCoordinates] = useState(null);
    console.log("CORD", coordinates);

    const [datiMeteoCitta, setDatiMeteoCitta] = useState(null);
    console.log("DATI METEO CITTA", datiMeteoCitta); */

    const handleInputValue = (event) => {
        setCityname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <MyNavBarComponent />
                                <MainPage
                                    handleInputValue={handleInputValue}
                                    handleSubmit={handleSubmit}
                                    cityname={cityname}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/DettagliCitta"
                        element={
                            <>
                                {" "}
                                <MyNavBarComponent />
                                <DetailsSIngleCity cityname={cityname} />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
