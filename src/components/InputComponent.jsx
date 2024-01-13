import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const InputComponent = (props) => {
    const { handleInputValue, handleSubmit } = props;

    return (
        <>
            <InputGroup className="mb-3">
                {" "}
                <InputGroup.Text id="basic-addon1">quale città stai cercando ?</InputGroup.Text>
                <div className="d-flex ms-auto">
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex">
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleInputValue}
                            ></Form.Control>
                            <Button type="submit" variant="dark" className="text-light">
                                {" "}
                                cerca{" "}
                            </Button>
                        </div>
                    </Form>
                </div>
            </InputGroup>
        </>
    );
};

export default InputComponent;
