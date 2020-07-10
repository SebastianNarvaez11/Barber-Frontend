import React, { Component, Fragment } from 'react'
import { Button, Row, Col, Modal } from 'react-bootstrap'
import FormUpdateService from './FormUpdateService'
import { deleteProduct } from '../../store-manager/actions/ProductActions'
import { connect } from 'react-redux'



export class Service extends Component {

  state = {
    show: false
  }

  handleChangeModal = () => {
    this.setState({ show: !this.state.show })
  }

  handleDelete = () => {
    const formData = new FormData()
    formData.append('name', this.props.service.name)
    formData.append('price', this.props.service.price)
    formData.append('description', this.props.service.description)
    formData.append('duration', this.props.service.duration)
    formData.append('status', this.props.service.status)
    let option = window.confirm(`¿Esta seguro de eliminar el servicio '${this.props.service.name}' ?`)
    if (option) {
      this.props.service.deleted = true
      formData.append('deleted', true)
      this.props.deleteProduct(formData, this.props.service.id)
    }
  }

  render() {
    const { name, price, duration } = this.props.service
    return (
      <Fragment>
        <tr>
          <td>{name}</td>
          <td>$ {price}</td>
          <td>{duration}</td>
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
        <Modal show={this.state.show} size="lg" onHide={this.handleChangeModal}>
          <Modal.Header bg='success'  closeButton>
            <Modal.Title>Editar Servicio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUpdateService service={this.props.service} handleChangeModal={this.handleChangeModal} />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }

}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: (service, id) => dispatch(deleteProduct(service, id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Service)