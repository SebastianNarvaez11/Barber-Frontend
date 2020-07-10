import React, { Component } from 'react'
import { Button, Form, Col, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateUser } from '../../store-manager/actions/UserActions';

export class FormUpdateUser extends Component {
  state = {
    ...this.props.user,
    username: this.props.user.username,
    email: this.props.user.email,
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    role: this.props.user.role,
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmite = (e) => {
    e.preventDefault()
    const user = this.state//asigna los valores del state actual a la variable user
    this.props.updateUser(user, this.props.handleChangeModal)//añadir el objeto a la lista de usuarios
  }

  render() {
    return (
      <Form onSubmit={this.onSubmite}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name='username' type="text" required placeholder="Username" defaultValue={this.state.username} onChange={this.onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' type="email" required placeholder="Email" defaultValue={this.state.email} onChange={this.onChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name='first_name' type="text" required placeholder="nombre" defaultValue={this.state.first_name} onChange={this.onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLatsName">
            <Form.Label>last_name</Form.Label>
            <Form.Control name='last_name' type="text" required placeholder="apellido" defaultValue={this.state.last_name} onChange={this.onChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Rol</Form.Label>
            <Form.Control name='role' as="select" value={this.state.role} required onChange={this.onChange}>
              <option value='0' disabled>Seleccione un rol...</option>
              <option value='ADMIN'>Administrador</option>
              <option value='CLIENTE'>Cliente</option>
              <option value='PELUQUERO'>Peluquero</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button variant="success" type="submit">
          Actualizar
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
    updateUser: (user, handleChangeModal) => {
      dispatch(updateUser(user, handleChangeModal));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdateUser);
