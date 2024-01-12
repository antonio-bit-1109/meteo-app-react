import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavBarComponent from "./components/MyNavBarComponent";
import { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import DetailsSIngleCity from "./components/DetailsSIngleCity";

const App = () => {
    const [cityname, setCityname] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    console.log("CORD", coordinates);

    const handleInputValue = (event) => {
        setCityname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        FetchCityCoordinates(cityname);
    };

    /* 1 FETCH VERSO APP GEOCODER GET DELLE COORDINATES*/
    const FetchCityCoordinates = (value) => {
        const options = {
            method: "GET",
            headers: {},
        };

        const APIKey = "acb08f24ca1c3d1d35561583c8e68e21";

        const getCoordinatesCitta = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=${APIKey}`;

        fetch(getCoordinatesCitta, options)
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

    useEffect(() => {
        /* 2 FETCH QUANDO CAMBIANO LE COORDINATE SALVATE NELLO STATO  */
        if (coordinates) {
            const options = {
                method: "GET",
                headers: {},
            };
            const APIKey = "acb08f24ca1c3d1d35561583c8e68e21";
            const getCityInfos = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=${APIKey}`;

            fetch(getCityInfos, options)
                .then((responseMeteodata) => {
                    console.log(responseMeteodata);
                    if (!responseMeteodata.ok) {
                        if (responseMeteodata.status > 400 && responseMeteodata.status < 500) {
                            if (responseMeteodata.status === 429) {
                                throw new Error("429 INFAME PER TE TANTE COSE BRUTTE");
                            } else {
                                throw new Error("STAI CAPPELLANDO , RIGUARDA QUELLO CHE HAI SCRITTO");
                            }
                        }
                        if (responseMeteodata.status > 500 && responseMeteodata.status < 600) {
                            throw new Error("SERVER SPOMPATO, NON FUNZIA??");
                        }
                    } else {
                        return responseMeteodata.json();
                    }
                })
                .then((meteoCityDatas) => {
                    console.log(meteoCityDatas);
                })
                .catch((err) => console.error(err));
        }
    }, [coordinates]);

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
                    {/*  <Route
                        path="/DettagliCitta"
                        element={
                            <>
                                {" "}
                                <MyNavBarComponent
                                    handleInputValue={handleInputValue}
                                    handleSubmit={handleSubmit}
                                    cityname={cityname}
                                />
                                <DetailsSIngleCity />
                            </>
                        }
                    /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
