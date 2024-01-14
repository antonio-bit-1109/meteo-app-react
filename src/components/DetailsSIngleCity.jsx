import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import InputComponent from "./InputComponent";
import { it } from "date-fns/locale";
import { Link } from "react-router-dom";

const DetailsSIngleCity = (props) => {
    const { cityname } = props;
    console.log("DATI METEO CITTA", cityname);

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [datiMeteoCitta, setDatiMeteoCitta] = useState(null);
    const [imageCity, setImageCity] = useState(null);
    console.log("PNG CITTA", imageCity);

    const [inputString, setInputString] = useState("");
    console.log("inputString", inputString);

    const handleInputValue = (event) => {
        setInputString(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit button clicked");
        FetchCityCoordinates(inputString);
        fetchToGetImage(inputString);
    };

    useEffect(() => {
        FetchCityCoordinates(cityname);
        fetchToGetImage(cityname);
    }, [cityname]);

    useEffect(() => {
        if (lat && lon) {
            fetchtoGetCityMeteoDetails(lat, lon);
        }
    }, [lat, lon]);

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
                setLat(data[0].lat);
                setLon(data[0].lon); /* prendo i valori di lat e lon */
            })

            .catch((err) => console.error(err));
    };

    const fetchtoGetCityMeteoDetails = (value0, value1) => {
        /* 2 FETCH QUANDO CAMBIANO LE COORDINATE SALVATE NELLO STATO  */

        const options = {
            method: "GET",
            headers: {},
        };
        const APIKey = "acb08f24ca1c3d1d35561583c8e68e21";
        const getCityInfos = `https://api.openweathermap.org/data/2.5/forecast?lat=${value0}&lon=${value1}&appid=${APIKey}&units=metric`;

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
                setDatiMeteoCitta(meteoCityDatas);
            })
            .catch((err) => console.error(err));
    };
    /* 3° fetch ad API https://api.teleport.org/api/urban_areas/slug:milan/images/ per ricavare img di sfondo (inglese) */
    const fetchToGetImage = (value) => {
        const options = {
            method: "GET",
            headers: {},
        };

        fetch(`https://api.teleport.org/api/urban_areas/slug:${value}/images/`, options)
            .then((fetchResponse) => {
                console.log(fetchResponse);
                if (!fetchResponse.ok) {
                    if (fetchResponse.status > 400 && fetchResponse.status < 500) {
                        if (fetchResponse.status === 429) {
                            throw new Error("429 INFAME PER TE TANTE COSE BRUTTE");
                        } else {
                            throw new Error("STAI CAPPELLANDO , RIGUARDA QUELLO CHE HAI SCRITTO");
                        }
                    }
                    if (fetchResponse.status > 500 && fetchResponse.status < 600) {
                        throw new Error("SERVER SPOMPATO, NON FUNZIA??");
                    }
                } else {
                    return fetchResponse.json();
                }
            })
            .then((imagesData) => {
                console.log("IMMAGINE", imagesData);
                setImageCity(imagesData.photos[0].image.mobile);
            });
    };

    return (
        <>
            {
                <div
                    style={{
                        minHeight: "95vh",
                        backgroundImage: imageCity && `url(${imageCity})`,
                    }}
                    className={!imageCity ? "sfondo" : "dimensioni-Sfondo"}
                >
                    {datiMeteoCitta && (
                        <Container>
                            <Row className="justify-content-center align-items-center">
                                <Col sm={12}>
                                    <div className="m-5">
                                        <InputComponent
                                            handleInputValue={handleInputValue}
                                            handleSubmit={handleSubmit}
                                        />
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className="d-flex justify-content-center mb-5">
                                        {" "}
                                        <Link to={`/moreInfosCity/${inputString || cityname}`}>
                                            {" "}
                                            <Button className="text-light" variant="info">
                                                Maggiori info sulla città
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="m-auto">
                                {/* info generali sul meteo della città */}
                                <Col>
                                    <div className="rounded-2 background-style d-flex flex-column">
                                        <div>
                                            <span className="display-3">{datiMeteoCitta.city.name}</span> ,{" "}
                                            <span className="display-3">{datiMeteoCitta.city.country}</span>
                                        </div>
                                        <div className="fs-5">Latitudine: {datiMeteoCitta.city.coord.lat} , </div>
                                        <div className="fs-5">Longitudine: {datiMeteoCitta.city.coord.lon} </div>
                                        <div className="fs-5">
                                            Popolazione : {datiMeteoCitta.city.population} abitanti
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Container>
                                <Row className="justify-content-center">
                                    {datiMeteoCitta.list.slice(0, 1).map((objData) => (
                                        <div className="text-center rounded-circle background-style p-5 my-5 max-width-cerchio">
                                            <h2>
                                                {" "}
                                                {format(new Date(objData.dt_txt), "dd MMMM HH:mm", {
                                                    locale: it,
                                                })}
                                            </h2>
                                            <h3>{objData.weather[0].main}</h3>
                                            <h6>{objData.weather[0].description}</h6>

                                            <Card.Img
                                                variant="top"
                                                src={`https://openweathermap.org/img/w/${objData.weather[0].icon}.png`}
                                                alt="immagine meteo"
                                                style={{ width: "30%" }}
                                            />
                                            <h2> Temperatura : {objData.main.temp} C°</h2>
                                            <div>Percepita: {objData.main.feels_like} C°</div>
                                            <div>Temp.min: {objData.main.temp_min} C°</div>
                                            <div>Temp.Max: {objData.main.temp_max} C°</div>
                                            <div>Umidità: {objData.main.humidity} %</div>
                                            <div> nuvolosità: {objData.clouds.all}%</div>
                                        </div>
                                    ))}{" "}
                                </Row>
                            </Container>
                            {/* primi 3 array con card grandi  */}

                            {/* <Row>
                                {datiMeteoCitta.list.slice(0, 3).map((objData) => (
                                    <Col
                                        sm={8}
                                        md={6}
                                        lg={4}
                                        xl={4}
                                        xxl={4}
                                        key={objData.dt}
                                        className="mx-auto" 
                                    >
                                        <Card className="m-2 background-style">
                                            <Card.Body>
                                                <h2>
                                                    {" "}
                                                    {format(new Date(objData.dt_txt), "dd/MMMM/yyyy HH:mm", {
                                                        locale: it,
                                                    })}
                                                </h2>
                                                <Card.Title>{objData.weather[0].main}</Card.Title>
                                                <Card.Text>{objData.weather[0].description}</Card.Text>

                                                <Card.Img
                                                    variant="top"
                                                    src={`https://openweathermap.org/img/w/${objData.weather[0].icon}.png`}
                                                    alt="immagine meteo"
                                                    style={{ width: "30%" }}
                                                />
                                                <h5> temperatura : {objData.main.temp} C°</h5>
                                                <div>Percepita: {objData.main.feels_like} C°</div>
                                                <div>Temp.min: {objData.main.temp_min} C°</div>
                                                <div>Temp.Max: {objData.main.temp_max} C°</div>
                                                <div>Umidità: {objData.main.humidity} %</div>
                                                <div> nuvolosità: {objData.clouds.all}%</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row> */}

                            <Row sm={1} md={2} lg={3} xl={4} xxl={4}>
                                {/* ulteriori 6 elementi in formato piccolo  */}
                                {datiMeteoCitta.list.slice(3, 12).map((objData) => (
                                    <Col key={objData.dt} className="mx-auto" sm={12} md={8} lg={6} xl={4} xxl={4}>
                                        <Card className="m-2 background-style">
                                            <Card.Body>
                                                <div className="d-flex">
                                                    <h5>
                                                        {format(new Date(objData.dt_txt), "dd/MMMM HH:mm", {
                                                            locale: it,
                                                        })}
                                                    </h5>
                                                    <Card.Img
                                                        variant="top"
                                                        src={`https://openweathermap.org/img/w/${objData.weather[0].icon}.png`}
                                                        alt="immagine meteo"
                                                        style={{ width: "30%" }}
                                                        className="mx-2"
                                                    />
                                                    <div className="d-flex flex-column">
                                                        <Card.Title>{objData.weather[0].main}</Card.Title>
                                                        <Card.Text>{objData.weather[0].description}</Card.Text>
                                                    </div>

                                                    <div className="ms-3">
                                                        <h5> Temp: {objData.main.temp} C°</h5>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}
                </div>
            }
        </>
    );
};

export default DetailsSIngleCity;
