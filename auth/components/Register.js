import React, {useState} from "reactn";
import {Link, Redirect} from "react-router-dom";
import {api, useApi} from "../../api/apiEntryPoint";
import {registerUser} from "../authApiCalls";
import {alertWarning, useAlert} from "../../alerts/alerts";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {LoginRegisterContainer} from "./auth.styled";
import {AnimFadeSection} from "../../reactComponentStyles/reactCommon.animations";
import {useWasmContext} from "../../reactwasmcanvas/localreacwasmcanvas";

const Register = (props) => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  useWasmContext(false);
  const authApi = useApi('auth');
  const [auth] = authApi;
  const alert = useAlert();

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
    <AnimFadeSection>
      {auth && <Redirect to="/dashboarduser"/>}
      {!auth &&
      <LoginRegisterContainer>
        <Container fluid>
          <Row>
            <br/>
          </Row>
          <Row>
            <Col sm={2}/>
            <Col sm={8}>
              <h1 className="text-info">
                Sign Up
              </h1>
            </Col>
            <Col sm={2}/>
          </Row>
          <Row>
            <Col sm={2}/>
            <Col sm={8}>
              <p className="lead">
                <span className="text-warning"><i className="fas fa-user"/></span> Create Your Account
              </p>
            </Col>
            <Col sm={2}/>
          </Row>
          <br/>
          <Row>
            <Col sm={2}/>
            <Col sm={8}>
              <Form onSubmit={(ev) => onSubmit(ev)}>
                <Form.Group as={Row} controlId="formBasicUserName">
                  <Form.Label column sm={2} className={"text-white  font-weight-bold"}>
                    Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control name={"name"} type={"text"} placeholder={"How people will see you"}
                                  onChange={e => onChange(e)} required/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBasicEmail">
                  <Form.Label column sm={2} className={"text-white  font-weight-bold"}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control name={"email"} type={"email"} placeholder={"Enter email"} onChange={e => onChange(e)}
                                  required/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBasicPassword">
                  <Form.Label column sm={2} className={"text-white  font-weight-bold"}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control name="password" type="password" placeholder="Password" minLength="8"
                                  autoComplete="new-password" onChange={e => onChange(e)} required/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBasicPassword2">
                  <Form.Label column sm={2} className={"text-white  font-weight-bold"}>
                    Confirm
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control name="password2" type="password" placeholder="Confirm Password" minLength="8"
                                  onChange={e => onChange(e)} required/>
                  </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col sm={2}/>
          </Row>
          <Row>
            <Col sm={2}/>
            <Col sm={8}>
              <p className="my-3">
                Already have an account? <Link to="/login"><span className="text-info">Sign In</span></Link>
              </p>
            </Col>
            <Col sm={2}/>
          </Row>
        </Container>
      </LoginRegisterContainer>
      }
    </AnimFadeSection>
  );
};

export default Register;
