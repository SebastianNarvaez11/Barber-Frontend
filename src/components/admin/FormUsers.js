import React, { Component } from 'react'
import { Button, Form, Col, } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createUser } from '../../store-manager/actions/UserActions'

export class FormUsers extends Component {
  state = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '0',
    is_active: true,
    password: '',
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmite = (e) => {
    e.preventDefault()
    const user = this.state//asigna los valores del state actual a la variable user
    this.props.createUser(user, this.props.handleChangeModal)//añadir el objeto a la lista de usuarios¿
  }

  render() {
    return (
      <Form onSubmit={this.onSubmite}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name='username' type="text" required placeholder="Username" onChange={this.onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' type="email" required placeholder="Email" onChange={this.onChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name='first_name' type="text" required placeholder="Nombre" onChange={this.onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLatsName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name='last_name' type="text" required placeholder="Apellido" onChange={this.onChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>role</Form.Label>
            <Form.Control name='role' as="select" value={this.state.role} required onChange={this.onChange}>
              <option value='0' disabled>Seleccione un rol...</option>
              <option value='ADMIN'>Administrador</option>
              <option value='CLIENTE'>Cliente</option>
              <option value='PELUQUERO'>Peluquero</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control name='password' type="password" required placeholder="Contraseña" onChange={this.onChange} />
          </Form.Group>
        </Form.Row>

        <Button variant="success" type="submit">
          Crear Usuario
        </Button>
        <Button variant="secondary" onClick={this.props.handleChangeModal}>Cancelar</Button>
      </Form>
    )
  }
}


const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (user, handleChangeModal) => dispatch(createUser(user, handleChangeModal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUsers);
