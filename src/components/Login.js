import React, { Component } from 'react'
import '../static/css/Login.css'
import { Card, Form, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLogin } from '../store-manager/actions';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import { getConfig } from "../config";
let config = getConfig()
let apiURL = config.apiURL
class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (event, field) => {
    let new_state = {}
    new_state[field] = event.target.value;

    this.setState(new_state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiURL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password
      })
    }).then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error);
        }
        if (typeof(res.access) === 'undefined' || res.access === ''){
          throw new Error("Credenciales incorrectas");
        }

        localStorage.setItem('currentToken', JSON.stringify(res));
        toast.success("Credenciales correctas");
        this.props.login(res);
      })
      .catch(error => {
        try {
          if(typeof error === 'object'){
            throw new Error("Error");
          }
          toast.error(error);
        } catch (err) {
          toast.error("Credenciales incorrectas");
        }
      });
  }

  render() {
    const { barber, is_logged } = this.props;
    if (is_logged) {
      return <Redirect to='/admin' />
    }

    return (
      <div className='fondo' style={{
        backgroundColor: 'red',
        backgroundImage: `url(${config.staticURL}/media/bg-login.jpeg)`
      }}>
        <Container className='d-flex justify-content-center mt-5'>
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <div className="sidebar-heading text-center mt-1 pro-img">
                <img
                  alt=""
                  src={barber.logo}
                  className="profile-pic imagen_cover img-thumbnail"
                />
              </div>
              <Card.Title className='text-center'>{barber.name}</Card.Title>
              <Container>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de usuario" value={this.state.username} onChange={(e) => this.handleChange(e, 'username')} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} />
                  </Form.Group>
                  <Button className='btn-block mb-3' variant="primary" type="submit">
                    Ingresar
                                    </Button>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    'barber': state.general.barber,
    'is_logged': state.general.is_logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    'login': (token) => {
      dispatch(setLogin(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
