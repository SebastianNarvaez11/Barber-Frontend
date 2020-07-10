import React, { Component } from 'react'
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createProduct } from '../../store-manager/actions/ProductActions';
export class FormServices extends Component {

  state = {
    name: '',
    price: '',
    description: '',
    duration: '',
    status: '0',
    files: []
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSelectPhotos = (e) => {
    this.setState({ files: [...this.state.files, ...e.target.files] })
  }


  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('price', this.state.price)
    formData.append('description', this.state.description)
    formData.append('duration', this.state.duration)
    formData.append('status', this.state.status)
    this.props.createProduct(formData, this.props.toggleModal, this.state.files)
  }

  handleDeleteSelect = (file) => {
    this.setState({ files: this.state.files.filter(photo => photo.name !== file.name) })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name='name' type="text" required placeholder="Nombre" onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as='textarea' name='description' type="text" required placeholder="Descripcion" onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridLatsName">
                <Form.Label>Precio</Form.Label>
                <Form.Control name='price' type="number" required placeholder="Precio" onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Duracion</Form.Label>
                <Form.Control name='duration' placeholder="Duracion" type='text' required onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridAactive">
              <Form.Label>Estado</Form.Label>
              <Form.Control name='status' as="select" value={this.state.status} required onChange={this.onChange}>
                <option value='0' disabled>Seleccione un estado...</option>
                <option value='ACTIVO'>Activo</option>
                <option value='INACTIVO'>Inactivo</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Fotos</Form.Label>
              <Form.Control type="file" name="files" multiple required onChange={this.handleSelectPhotos} />
            </Form.Group>
          </Col>

          {this.state.files &&
            this.state.files.map(file => (
              <Col lg={6} sm={6} className='mb-2'>
                <Card style={{ width: '150px' }}>
                  <Card.Img className="img-thumbnail" variant="top" style={{ height: '150px', width: '150px' }} src={typeof (file) == 'string' ? file : URL.createObjectURL(file)} />
                  <span style={{ fontSize: '20px', color: '#f5222d' }} className='text-center' onClick={() => this.handleDeleteSelect(file)}>
                    <i style={{ cursor: 'pointer' }} title='eliminar' className="fas fa-times"></i>
                  </span>
                </Card>
              </Col>
            ))
          }

        </Row>
        <Button variant="success" type="submit">
          Crear Servicio
        </Button>
        <Button variant="secondary" onClick={this.props.toggleModal}>
          Cancelar
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: (formData, toggleModal, files) => {
      dispatch(createProduct(formData, toggleModal, files));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormServices);

