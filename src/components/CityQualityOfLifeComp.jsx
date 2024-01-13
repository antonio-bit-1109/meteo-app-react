import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";

const CityQualityOfLifeComp = () => {
    const param = useParams();
    console.log("PARAMETRO STRINGA", param);

    const [cityQualityInfo, setQualityInfo] = useState(null);
    console.log("INFO QUALITA CITTA", cityQualityInfo);

    const [imageCity, setImageCity] = useState(null);
    console.log("PNG CITTA", imageCity);

    /*     const [paroleTradotte, setparoleTradotte] = useState(null);
    console.log("array di parole tradotte", paroleTradotte); */

    /*     const [matriceDiParoleTradotte, setMatriceDiParoleTradotte] = useState(null);
    console.log("matriceDiParoleTradotte", matriceDiParoleTradotte); */

    useEffect(() => {
        if (param.cityName) {
            fetchMoreCityInfos(param.cityName);
            fetchToGetImage(param.cityName);
        }
    }, [param.cityName]);

    /*         useEffect(() => {
        if (cityQualityInfo) {
            const arrayOfWords = cityQualityInfo.categories.map((obj) => {
                return obj.name;
            });
            console.log(arrayOfWords);
            translateText(arrayOfWords);
        }
    }, [cityQualityInfo]); */

    /* trasformo questo singolo array di stringhe in una matrice in modo da poterle usare nel carosello con il map  */
    /*     useEffect(() => {
        if (paroleTradotte) {
            const matrix = paroleTradotte.split(",").map((item) => [item]);
            return setMatriceDiParoleTradotte(matrix);
        }
    }, [paroleTradotte]); */

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

    const fetchMoreCityInfos = (value) => {
        const options = {
            method: "GET",
            headers: {},
        };

        fetch(`https://api.teleport.org/api/urban_areas/slug:${value}/scores/`, options)
            .then((apiResponse) => {
                console.log(apiResponse);
                if (!apiResponse.ok) {
                    if (apiResponse.status > 400 && apiResponse.status < 500) {
                        if (apiResponse.status === 429) {
                            throw new Error("429 INFAME PER TE TANTE COSE BRUTTE");
                        } else {
                            throw new Error("STAI CAPPELLANDO , RIGUARDA QUELLO CHE HAI SCRITTO");
                        }
                    }
                    if (apiResponse.status > 500 && apiResponse.status < 600) {
                        throw new Error("SERVER SPOMPATO, NON FUNZIA??");
                    }
                } else {
                    return apiResponse.json();
                }
            })
            .then((datas) => {
                console.log("INFO QUALITA", datas);
                setQualityInfo(datas);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    /* fetch per la traduzione automatica dei testi dei dettagli sulla città in italiano */

    /*     const translateText = (value) => {
        const url = "https://translate281.p.rapidapi.com/";
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": "d6e9cb0a6amsh24090e1f23b56e4p1220d1jsne74a23bfe846",
                "X-RapidAPI-Host": "translate281.p.rapidapi.com",
            },
            body: new URLSearchParams({
                text: value,
                from: "en",
                to: "it",
            }),
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setparoleTradotte(result.response);
            })
            .catch((error) => console.error(error));
    }; */

    return (
        <div>
            {cityQualityInfo && (
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

                    <Container>
                        <Row>
                            <Col>
                                {" "}
                                <div className="my-3">
                                    <h2>
                                        <span className="fs-3">PUNTEGGIO TOTALE: </span>
                                        <span className="display-1">
                                            {" "}
                                            {Math.floor(cityQualityInfo.teleport_city_score * 100) / 100} Pt
                                        </span>
                                    </h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div
                                    className="fs-3 my-3"
                                    dangerouslySetInnerHTML={{ __html: cityQualityInfo.summary }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Carousel data-bs-theme="dark" className="my-4 no-carousel-indicators">
                                {cityQualityInfo.categories.map((qualityProp) => (
                                    <Carousel.Item key={`item-${qualityProp.color}`}>
                                        <div className="d-flex align-items-center justify-content-around">
                                            <h1 className="display-3" style={{ color: qualityProp.color }}>
                                                {qualityProp.name.toUpperCase()}
                                            </h1>
                                            <h2 className="display-4">
                                                {Math.floor(qualityProp.score_out_of_10 * 100) / 100} Pt / / 10 Pt
                                            </h2>
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Row>
                    </Container>
                </>
            )}
        </div>
    );
};

export default CityQualityOfLifeComp;
