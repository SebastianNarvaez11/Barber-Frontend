import React, { Component } from 'react'
import { Button, Row, Col, Modal } from 'react-bootstrap'
import FormUpdateUser from './FormUpdateUser'
import { deleteUser } from '../../store-manager/actions/UserActions'
import { connect } from 'react-redux'



export class User extends Component {

  state = {
    show: false
  }

  handleChangeModal = () => {
    this.setState({ show: !this.state.show })
  }

  handleDelete = () => {
    let option = window.confirm(`¿Esta seguro de eliminar al usuario '${this.props.user.username}' ?`)
    if (option) {
      this.props.user.is_active = false
      this.props.deleteUser(this.props.user)
    }
  }


  render() {
    const { username, email, first_name, last_name, role } = this.props.user
    return (
      <React.Fragment>
        <tr>
          <td>{username}</td>
          <td>{email}</td>
          <td>{first_name} {last_name}</td>
          <td>{role}</td>
          <td>
            <Row className='text-center'>
              <Col>
                <Button className='btn-block' variant="warning" type="submit" onClick={this.handleChangeModal}>
                  Editar
            </Button>
              </Col>
              <Col>
                <Button className='btn-block' variant="danger" type="button" onClick={this.handleDelete}>
                  Eliminar
                </Button>
              </Col>
            </Row>
          </td>
        </tr>

        <Modal show={this.state.show} onHide={this.handleChangeModal}>
          <Modal.Header bg='success' closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUpdateUser user={this.props.user} handleChangeModal={this.handleChangeModal} />
          </Modal.Body>
        </Modal>
      </React.Fragment>

    )
  }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: (user) => dispatch(deleteUser(user))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(User)
