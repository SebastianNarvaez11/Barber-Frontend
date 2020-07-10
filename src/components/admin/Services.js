import React, { Component } from 'react'
import { Button, Card, Container, Table, Modal } from 'react-bootstrap';
import FormServices from './FormServices'
import Service from './Service'
import { fetchProducts } from '../../store-manager/actions/ProductActions'
import { connect } from 'react-redux';

export class Services extends Component {

  state = {
    show: false
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  toggleModal = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { services } = this.props;

    return (
      <Container className='mt-5'>
        <Card border="primary">
          <Card.Header>Servicios</Card.Header>
          <Card.Body>
            <Card.Title> Gestion de servicios  </Card.Title>

            <Button variant="success" onClick={this.toggleModal}>
              Crear Servicio
            </Button>

            <Modal size="lg" show={this.state.show} onHide={this.toggleModal}>
              <Modal.Header bg='success' closeButton>
                <Modal.Title>Crear Servicio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormServices toggleModal={this.toggleModal} />
              </Modal.Body>
            </Modal>
            <div className="table-responsive">
              <Table className='table mt-3' striped hover>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Servicio</th>
                    <th>precio</th>
                    <th>duracion</th>
                    <th>acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <Service key={service.id} position={service.id} service={service} />
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    'services': state.productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);