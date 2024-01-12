import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";

const MainPage = (props) => {
    const { handleInputValue, cityname } = props;
    return (
        <div className="background-image overflow-auto">
            <Container>
                <Row className="justify-content-center">
                    <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <div className="d-flex justify-content-center mt-5 display-3">Vediamo che tempo fa a...</div>
                    </Col>
                    <Col sm={12} md={8} lg={6} xl={5} xxl={5}>
                        {" "}
                        <div className="my-5">
                            {
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Cerca una città..."
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={handleInputValue}
                                        value={cityname}
                                    />

                                    <Link to={`/DettagliCitta/${cityname}`}>
                                        <Button type="button" variant="outline-success">
                                            Search
                                        </Button>
                                    </Link>
                                </Form>
                            }{" "}
                        </div>{" "}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;
