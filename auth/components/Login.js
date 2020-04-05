import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";

import {api, useApi} from "../../api/apiEntryPoint";
import {loginUser} from "../authApiCalls";
import {Auth} from "../authAccessors";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Login = (props) => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
    project: ""
  });

  const authApi = useApi(Auth);
  const [auth] = authApi;

  if (auth) {
    return <Redirect to="/dashboarduser"/>;
  }

  const {email, password} = formData;
  const onChange = e =>
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const performLogin = (ev) => {
    ev.preventDefault();
    api(authApi, loginUser, email, password, props.websocketMessageHandler).then();
  };

  return (
    <Container fluid>
      <Row>
        <br/>
        <br/>
        <br/>
      </Row>
      <Row>
        <Col/>
        <Col>
          <h1 className="text-info">
            Login
          </h1>
        </Col>
        <Col/>
      </Row>
      <Row>
        <Col/>
        <Col>
          <p className="lead">
            <span className="text-warning"><i className="fas fa-user"/></span> Log-in Into Your Account
          </p>
        </Col>
        <Col/>
      </Row>
      <Row>
        <Col/>
        <Col>
          <Form onSubmit={(ev) => performLogin(ev)}>
            <br/>
            <Form.Control name={"email"} type={"email"} placeHolder={"enter email"} onChange={e => onChange(e)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <br/>
            <Form.Group controlId="formBasicPassword">
              <Form.Control name="password" type="password" placeholder="Password" minLength="8" autoComplete="current-password" onChange={e => onChange(e)}/>
            </Form.Group>
            <Button variant="info" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col/>
      </Row>
      <Row>
        <Col/>
        <Col>
          <p className="my-3">
            Don't have an account? <Link to="/register"><span className="text-info">Sign Up</span></Link>
          </p>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
};

export default Login;
