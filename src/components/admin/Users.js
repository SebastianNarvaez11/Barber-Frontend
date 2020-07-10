import React, { Component } from 'react'
import { Button, Card, Container, Table, Modal } from 'react-bootstrap';
import User from './User';
import FormUsers from './FormUsers';
import { fetchUsers } from '../../store-manager/actions/UserActions'
import { connect } from 'react-redux';


export class Users extends Component {

  state = {
    show: false
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleChangeModal = () => this.setState({ show: !this.state.show });

  render() {
    const { users } = this.props;
    return (
      <Container className='mt-5'>
        <Card border="primary">
          <Card.Header>Usuarios</Card.Header>
          <Card.Body>
            <Card.Title> Gestion de usuarios  </Card.Title>

            <Button variant="success" onClick={this.handleChangeModal}>
              Crear Usuario
            </Button>

            <Modal show={this.state.show} onHide={this.handleChangeModal}>
              <Modal.Header bg='success' closeButton>
                <Modal.Title>Crear Usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormUsers handleChangeModal={this.handleChangeModal} />
              </Modal.Body>
            </Modal>
            <Table className='table mt-3' responsive striped hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th colSpan={2}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <User key={user.id}  user={user} />
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    'users': state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

