import React from "react";
import { Button } from "react-bootstrap";
import { Form, Link } from "react-router-dom";

const InputComponent = (props) => {
    const { handleInputValue, cityname } = props;

    return (
        <div>
            {" "}
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
        </div>
    );
};

export default InputComponent;
