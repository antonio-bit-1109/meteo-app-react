import React, { useEffect, useState } from "react";

const DetailsSIngleCity = (props) => {
    const { cityname } = props;
    console.log("DATI METEO CITTA", cityname);

    /* const [coordinates, setCoordinates] = useState({ lat: null, lon: null }); */
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [datiMeteoCitta, setDatiMeteoCitta] = useState(null);

    useEffect(() => {
        FetchCityCoordinates(cityname);
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
        const getCityInfos = `https://api.openweathermap.org/data/2.5/weather?lat=${value0}&lon=${value1}&appid=${APIKey}`;

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

    return <div>DetailsSIngleCity</div>;
};

export default DetailsSIngleCity;
