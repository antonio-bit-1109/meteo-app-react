import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainPage = (props) => {
    const { handleInputValue, handleSubmit, cityname } = props;
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {" "}
                        <div className="my-5">
                            <Form onSubmit={handleSubmit} className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Cerca una città..."
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleInputValue}
                                    value={cityname}
                                />

                                <Link to={"/DettagliCitta"}>
                                    <Button type="submit" variant="outline-success">
                                        Search
                                    </Button>
                                </Link>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainPage;
