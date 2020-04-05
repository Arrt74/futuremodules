import React, {useState} from "reactn";
import {Link, Redirect} from "react-router-dom";
import {api, useApi} from "../../api/apiEntryPoint";
import {registerUser} from "../authApiCalls";
import {alertWarning, useAlert} from "../../alerts/alerts";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Register = (props) => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const authApi = useApi('auth');
  const [auth] = authApi;
  const alert = useAlert();

  if (auth) {
    return <Redirect to="/dashboarduser"/>;
  }

  const {name, email, password, password2} = formData;
  const onChange = e =>
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      alertWarning(alert, "Passwords do not match");
    } else {
      api(authApi, registerUser, name, email, password, props.websocketMessageHandler);
    }
  };

  return (
    <Container fluid>
      <Row>
        <br/>
        <br/>
        <br/>
      </Row>
      <Row>
        <Col sm={3}/>
        <Col sm={6}>
          <h1 className="text-info">
            Sign Up
          </h1>
        </Col>
        <Col sm={3}/>
      </Row>
      <Row>
        <Col sm={3}/>
        <Col sm={6}>
          <p className="lead">
            <span className="text-warning"><i className="fas fa-user"/></span> Create Your Account
          </p>
        </Col>
        <Col sm={3}/>
      </Row>
      <br/>
      <Row>
        <Col sm={3}/>
        <Col sm={6}>
          <Form onSubmit={(ev) => onSubmit(ev)}>
            <Form.Group as={Row} controlId="formBasicUserName">
              <Form.Label column sm={2} className={"text-light"}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control name={"name"} type={"text"} placeHolder={"How people will see you"}
                              onChange={e => onChange(e)} required/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm={2} className={"text-light"}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control name={"email"} type={"email"} placeHolder={"Enter email"} onChange={e => onChange(e)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicPassword">
              <Form.Label column sm={2} className={"text-light"}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="password" type="password" placeholder="Password" minLength="8"
                              autoComplete="new-password" onChange={e => onChange(e)}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicPassword2">
              <Form.Label column sm={2} className={"text-light"}>
                Confirm
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="password2" type="password" placeholder="Confirm Password" minLength="8"
                              onChange={e => onChange(e)}/>
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col sm={3}/>
      </Row>
      <Row>
        <Col sm={3}/>
        <Col sm={6}>
          <p className="my-3">
            Already have an account? <Link to="/login"><span className="text-info">Sign In</span></Link>
          </p>
        </Col>
        <Col sm={3}/>
      </Row>
    </Container>
  );
};

export default Register;
