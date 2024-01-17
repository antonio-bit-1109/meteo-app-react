import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const CityQualityOfLifeComp = () => {
    const param = useParams();
    console.log("PARAMETRO STRINGA", param);

    const [imageCity, setImageCity] = useState(null);
    console.log("PNG CITTA", imageCity);

    const [infoAggiuntiveCity, setInfoAggiuntiveCity] = useState(null);
    console.log("infoAggiuntiveCity", infoAggiuntiveCity);

    useEffect(() => {
        if (param) {
            fetchToGetImage(param.cityName);
            const encodedLat = encodeURIComponent(param.lat);
            const encodedlong = encodeURIComponent(param.lon);
            console.log(encodedLat, encodedlong);
            fetchToGetLocationInfos(encodedLat, encodedlong);
        }
    }, [param]);

    const fetchToGetImage = (value) => {
        const optionsPexels = {
            method: "GET",
            headers: {
                Authorization: "7Ye7PHnNDdVmd43T5cthTwaF0I2AipmjtizxjFtVcXnzQIgCqJYlTLXP",
                "Content-type": "application/json",
            },
        };

        const urlPexels = `https://api.pexels.com/v1/search?query=${value}`;

        fetch(urlPexels, optionsPexels)
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
                setImageCity(imagesData.photos[2].src.landscape);
            });
    };

    const fetchToGetLocationInfos = (lat, long) => {
        const apiKey = "d6e9cb0a6amsh24090e1f23b56e4p1220d1jsne74a23bfe846";
        const apiHost = "wft-geo-db.p.rapidapi.com";
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?location=%2B${lat}%2B${long}`;

        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        };

        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                setInfoAggiuntiveCity(result);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="colorSfondo">
            {infoAggiuntiveCity && (
                <>
                    <Col xxl={12}>
                        <div>
                            <img
                                style={{
                                    width: "100%",
                                    height: "20rem",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                                src={imageCity}
                                alt="immagine città"
                            />
                        </div>
                    </Col>

                    <Container className="position-relative">
                        <Row>
                            <Col>
                                {" "}
                                <div className="my-3 text-center">
                                    <div className="d-flex justify-content-center align-items">
                                        <Link to={`/DettagliCitta/${param.cityName}`}>
                                            <div className="d-flex align-items-center">
                                                {" "}
                                                <ArrowLeft className="display-3 text-black position-absolute  top-0 start-0" />{" "}
                                            </div>
                                        </Link>
                                        <div className="display-2 ms-auto">LOCALITÀ NELLE VICINANZE </div>
                                    </div>
                                </div>
                            </Col>{" "}
                        </Row>
                        <Row>
                            {infoAggiuntiveCity.data.slice(0, 3).map((localita) => (
                                <Col key={localita.id}>
                                    {" "}
                                    {/* Aggiungi un key univoco per ogni elemento */}
                                    <div>
                                        <h3>{localita.name}</h3>
                                        <h4>{localita.countryCode}</h4>
                                        <h4>{localita.country}</h4>
                                        <h4>{localita.region}</h4>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        <Row></Row>
                    </Container>
                </>
            )}
        </div>
    );
};

export default CityQualityOfLifeComp;
