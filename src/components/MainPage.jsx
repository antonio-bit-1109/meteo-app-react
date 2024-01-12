import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MainPage = () => {
    return (
        <>
            <Container>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Che tempo fa a...</InputGroup.Text>
                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </InputGroup>
            </Container>
        </>
    );
};

export default MainPage;
