import React, { Component } from 'react'
import { Form, Col, Modal, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format'
import moment from 'moment';
import '../CustomModal.css'
import 'moment/locale/es';
import ReactStars from 'react-stars';
import { updateAppointment } from '../../store-manager/actions/AppointmentActions'
import { connect } from 'react-redux';


export class ModalInfoAppointment extends Component {


  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.initial_state = {
      form_validated: false,
      rating: 0,
      final_price: null
    }
    this.state = this.initial_state;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClickMainBtn = () => {

    try {
      const form = this.formRef.current;
      if (form.checkValidity() === true) {
        const formData = new FormData();
        formData.append('end_date', new Date().toISOString());
        formData.append('status', 'REALIZADA');
        formData.append('final_price', form.final_price.value);
        formData.append('rating', this.state.rating);
        this.props.updateAppointment(formData, this.props.appointment.id);
        this.props.onHide();
      }
      this.setState({ form_validated: true });
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }



  render() {
    const { appointment, show_modal, onHide } = this.props;

    return (
      <Modal
        show={show_modal}
        onHide={() => { onHide() }}
        dialogClassName="modal-appointment"
        id={"schedule"}
      >
        <Modal.Header closeButton className="no-slider">
          <Modal.Title>Finalizar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointment ?
            <>
              <div className="modal-appointment-form">
                <p className="title">Datos de Reserva</p>
                <Form ref={this.formRef} noValidate validated={this.state.form_validated} onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="start_date">
                      <Form.Label>Fecha inicial</Form.Label>
                      <p>{moment(appointment.start_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Form.Group>
                    <Form.Group as={Col} controlId="start_date">
                      <Form.Label>Fecha final</Form.Label>
                      <p>{moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="first_name">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control value={appointment.user.first_name} disabled={true} type="text" name="first_name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="last_name">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control value={appointment.user.last_name} disabled={true} type="text" name="last_name" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="email">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control value={appointment.user.email} disabled={true} type="email" name="email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="telephone">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control value={appointment.user.telephone} disabled={true} type="text" name="telephone" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="notes">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control as='textarea' value={appointment.notes} disabled={true} name="notes" />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="final_price">
                      <Form.Label>Precio final</Form.Label>
                      <Form.Control onChange={this.onChange} defaultValue={appointment.estimated_price} type="text" name="final_price" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="rating">
                      <Form.Label>Calificación</Form.Label>
                      <ReactStars
                        count={5}
                        value={this.state.rating}
                        onChange={(value) => this.setState({ rating: value })}
                        edit={true}
                        size={30}
                        color1={"#e6e6e6"}
                      />
                    </Form.Group>
                  </Form.Row>

                </Form>
              </div>

              <div className="modal-appointment-product-list">
                <div className="title">Servicios seleccionados</div>
                <div className="products">
                  {appointment.product && appointment.product.length > 0 ?
                    <>
                      <div className="products-lists">
                        {appointment.product.map((product) => {
                          return (<div key={product.id} className="flex-row-jst-btw product">
                            <div>{product.name}</div>
                            <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                          </div>)
                        })}

                      </div>
                      <div className="flex-row-jst-btw total">
                        <strong>Total</strong>
                        <NumberFormat value={appointment.product.reduce((total, product) => total + product.price, 0)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      </div>
                    </>
                    :
                    <div className="empty">No tiene ningun servicio</div>
                  }
                </div>
              </div>
            </>
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { onHide() }}>
            Atrás
            </Button>
          <Button variant="success" onClick={this.onClickMainBtn}>
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAppointment: (formData, id) => dispatch(updateAppointment(formData, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalInfoAppointment);
