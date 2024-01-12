import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const InputComponent = (props) => {
    /*   const {  } = props; */

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">che città stai cercando ?</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                ></Form.Control>

                <Button variant="dark" className="text-light">
                    {" "}
                    cerca{" "}
                </Button>
            </InputGroup>
        </>
    );
};

export default InputComponent;
