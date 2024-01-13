import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

const CityQualityOfLifeComp = () => {
    const param = useParams();
    console.log("PARAMETRO STRINGA", param);

    const [cityQualityInfo, setQualityInfo] = useState(null);
    console.log("INFO QUALITA CITTA", cityQualityInfo);

    const [imageCity, setImageCity] = useState(null);
    console.log("PNG CITTA", imageCity);

    useEffect(() => {
        if (param.cityName) {
            fetchMoreCityInfos(param.cityName);
            fetchToGetImage(param.cityName);
        }
    }, [param.cityName]);

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

    return (
        <>
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
                                <div
                                    className="fs-3 my-3"
                                    dangerouslySetInnerHTML={{ __html: cityQualityInfo.summary }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                        </Row>
                    </Container>
                </>
            )}
        </>
    );
};

export default CityQualityOfLifeComp;
