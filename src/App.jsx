import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import MyNavBarComponent from "./components/MyNavBarComponent";
import { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import DetailsSIngleCity from "./components/DetailsSIngleCity";
import NotFoundComponent from "./components/NotFoundComponent";

const App = () => {
    const [cityname, setCityname] = useState("");

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
                        path="/DettagliCitta/:IdData"
                        element={
                            <>
                                {" "}
                                <MyNavBarComponent />
                                <DetailsSIngleCity cityname={cityname} />
                            </>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <>
                                <MyNavBarComponent /> <NotFoundComponent />{" "}
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
