import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const InputComponent = (props) => {
    const { handleInputValue, handleSubmit } = props;

    return (
        <>
            <InputGroup className="justify-content-center w-100">
                {" "}
                {/* <InputGroup.Text id="basic-addon1">quale città stai cercando ?</InputGroup.Text> */}
                <Form className="w-100" onSubmit={handleSubmit}>
                    <div className="d-flex">
                        <Form.Control
                            className="rounded-0"
                            placeholder="Search the name of a City..."
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={handleInputValue}
                        ></Form.Control>
                        <Button type="submit" variant="dark" className="text-light px-4 rounded-end-pill">
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
