import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavBarComponent from "./components/MyNavBarComponent";
import { useState } from "react";
import MainPage from "./components/MainPage";
import DetailsSIngleCity from "./components/DetailsSIngleCity";
import NotFoundComponent from "./components/NotFoundComponent";
import CityQualityOfLifeComp from "./components/CityQualityOfLifeComp";
import { useSelector, useDispatch } from "react-redux";
import { setCityname } from "./redux/reducers/storeReducer";

const App = () => {
    /* const [cityname, setCityname] = useState(""); */
    const dispatch = useDispatch();
    const cityname = useSelector((state) => state.queryState.cityname);

    const handleInputValue = (event) => {
        dispatch(setCityname(event.target.value));
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
                                <MainPage handleInputValue={handleInputValue} cityname={cityname} />
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
                        path="/moreInfosCity/:cityName/:lat/:lon/:country"
                        element={
                            <>
                                <MyNavBarComponent />
                                <CityQualityOfLifeComp />
                            </>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <>
                                <MyNavBarComponent />
                                <NotFoundComponent />{" "}
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
