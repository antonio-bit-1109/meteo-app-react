import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NotFoundComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
            <Row>
                <Col>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h3 className="display-3">Ops, qui non c'è nulla!</h3>
                        <Link to={"/"} className="btn btn-primary">
                            Torna in HomePage{" "}
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default NotFoundComponent;
