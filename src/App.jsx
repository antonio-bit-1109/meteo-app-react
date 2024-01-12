import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavBarComponent from "./components/MyNavBarComponent";
import { useEffect, useState } from "react";

const App = () => {
    const [cityname, setCityname] = useState("roma");
    const [coordinates, setCoordinates] = useState(null);
    console.log("CORD", coordinates);

    const handleInputValue = (event) => {
        setCityname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        FetchCityCoordinates(cityname);
    };

    useEffect(() => {
        FetchCityCoordinates("roma");
    }, []);

    /* 1 fetch verso app geocoder */
    const FetchCityCoordinates = (value) => {
        const options = {
            method: "GET",
            headers: {},
        };

        const APIKey = "acb08f24ca1c3d1d35561583c8e68e21";

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=${APIKey}`, options)
            .then((response) => {
                if (!response.ok) {
                    if (response.status > 400 && response.status < 500) {
                        if (response.status === 429) {
                            throw new Error("429 INFAME PER TE TANTE COSE BRUTTE");
                        } else {
                            throw new Error("STAI CAPPELLANDO , RIGUARDA QUELLO CHE HAI SCRITTO");
                        }
                    }
                    if (response.status > 500 && response.status < 600) {
                        throw new Error("SERVER SPOMPATO, NON FUNZIA??");
                    }
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                setCoordinates(data); /* prendo tute le coordinates */
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <MyNavBarComponent
                                    handleInputValue={handleInputValue}
                                    handleSubmit={handleSubmit}
                                    cityname={cityname}
                                />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
