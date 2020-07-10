import React, { Component } from 'react'
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateProduct } from '../../store-manager/actions/ProductActions';
import { getConfig } from '../../config'
import axios from 'axios'
import { toast } from 'react-toastify';

export class FormUpdateService extends Component {

  state = {
    ...this.props.service,
    name: this.props.service.name,
    description: this.props.service.description,
    price: this.props.service.price,
    duration: this.props.service.duration,
    status: this.props.service.status,
    files: this.props.service.photos,
    extra: []
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectPhotos = (e) => {
    this.setState({ extra: [...this.state.extra, ...e.target.files] })
    console.log(this.state.extra)
  }


  handleDeletePhoto = (file) => {
    const formData = new FormData()
    formData.append('product', file.product)
    formData.append('deleted', true)
    let config = getConfig()
    let apiURL = config.apiURL


    let url = `${apiURL}/api/v1/product_photo/${file.id}/`
    axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(response => {
        this.setState({ files: this.state.files.filter(photo => photo.id !== file.id) })

        const formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('price', this.state.price)
        formData.append('description', this.state.description)
        formData.append('duration', this.state.duration)
        formData.append('status', this.state.status)
        this.props.updateProduct(formData, this.props.service.id, this.state.extra)
      })
      .catch(error => {
        toast.error(`${Object.values(error.response.data)[0]}`)
      })
  }

  handleDeleteSelect = (file) => {
    this.setState({ extra: this.state.extra.filter(photo => photo.name !== file.name) })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('price', this.state.price)
    formData.append('description', this.state.description)
    formData.append('duration', this.state.duration)
    formData.append('status', this.state.status)
    this.props.updateProduct(formData, this.props.service.id, this.state.extra, this.props.handleChangeModal)
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Col lg={6}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name='name' type="text" required defaultValue={this.state.name} placeholder="Nombre" onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as='textarea' name='description' type="text" defaultValue={this.state.description} required placeholder="Descripcion" onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>

              <Form.Group as={Col} controlId="formGridLatsName">
                <Form.Label>Precio</Form.Label>
                <Form.Control name='price' type="number" required defaultValue={this.state.price} placeholder="Precio" onChange={this.onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Duracion</Form.Label>
                <Form.Control name='duration' placeholder="Duracion" defaultValue={this.state.duration} type='text' required onChange={this.onChange} />
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

            <Form.Group as={Col} controlId="formGridExtra">
              <Form.Label>Fotos</Form.Label>
              <Form.Control type="file" name="extra" multiple required={!this.state.files ? true : false} onChange={this.handleSelectPhotos} />
            </Form.Group>

          </Col>
          <Col lg={6}>
            <Row>
              {
                this.state.files.map(file => (
                  <Col lg={6} sm={6} className='mb-2'>
                    <Card style={{ width: '150px' }}>
                      <Card.Img className="img-thumbnail" variant="top" style={{ height: '150px', width: '150px' }} src={typeof (file) == 'string' ? file.photo : file.photo} />
                      <span style={{ fontSize: '20px', color: '#f5222d' }} className='text-center' onClick={() => this.handleDeletePhoto(file)}>
                        <i style={{ cursor: 'pointer' }} title='eliminar' className="fas fa-times"></i>
                      </span>
                    </Card>
                  </Col>
                ))
              }
              {this.state.extra &&
                this.state.extra.map(file => (
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
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Actualizar Servicio
        </Button>
        <Button variant="secondary" onClick={this.props.handleChangeModal}>
          Cancelar
      </Button>
      </Form>
    )
  }
}


const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (formData, id, handleChangeModal, extra) => dispatch(updateProduct(formData, id, handleChangeModal, extra)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdateService);
