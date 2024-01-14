import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const InputComponent = (props) => {
    const { handleInputValue, handleSubmit } = props;

    return (
        <>
            <InputGroup className="justify-content-center">
                {" "}
                {/* <InputGroup.Text id="basic-addon1">quale città stai cercando ?</InputGroup.Text> */}
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex">
                        <Form.Control
                            placeholder="Search the name of a City..."
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={handleInputValue}
                        ></Form.Control>
                        <Button type="submit" variant="dark" className="text-light px-4">
                            {" "}
                            cerca{" "}
                        </Button>
                    </div>
                </Form>
            </InputGroup>
        </>
    );
};

export default InputComponent;
