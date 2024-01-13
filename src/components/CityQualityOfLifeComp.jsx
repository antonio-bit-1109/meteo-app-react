import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

const CityQualityOfLifeComp = () => {
    const param = useParams();
    console.log("PARAMETRO STRINGA", param);

    const [cityQualityInfo, setQualityInfo] = useState(null);

    useEffect(() => {
        if (param.cityName) {
            fetchMoreCityInfos(param.cityName);
        }
    }, [param.cityName]);

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
            {" "}
            {cityQualityInfo && (
                <Container>
                    <Row>
                        <Col></Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default CityQualityOfLifeComp;
