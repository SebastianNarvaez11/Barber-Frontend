import React, { Component } from 'react'
import { connect } from 'react-redux'
import './CustomModal.css'

import { toogleModal, addProduct, removeProduct,createAppointment } from '../store-manager/actions/AppointmentActions'
import { Modal, Button, Form, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format'
import ReactStars from 'react-stars'
import { genRand } from '../utils'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
registerLocale('es', es)
setDefaultLocale('es')

export class ModalAddAppointment extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.initial_state = {
      step: 1,
      max_steps: 2,
      form_validated: false,
      start_date: null,
      is_valid_date: false
    }
    this.state = this.initial_state;

  }

  onChangeDate = (date) => {
    try {
      let time_hours = date.getHours();
      if(time_hours >= 7 && time_hours <= 20 ){
        this.setState({ start_date: date, is_valid_date: true })
      }else{
        throw new Error("Error");
      }
    } catch (error) {
      this.setState({ start_date: null, is_valid_date: false })
    }
  }

  setStep = (step) => {
    this.setState({ step })
  }

  onClickMainBtn = () => {
    if (this.state.step === this.state.max_steps) {
      try {
        const form = this.formRef.current;
        if (form.checkValidity() === true) {
          const formData = new FormData(form);
          formData.append('start_date', Math.floor(this.state.start_date.getTime() / 1000));
          formData.append('products', JSON.stringify(this.props.products.map(product => product.id)));
          formData.append('estimated_price', this.props.products.reduce((total, product) => total + product.price, 0));
          this.props.createAppointment(formData, () => {
            this.setState(this.initial_state);
          });
        }
        this.setState({ form_validated: true });
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    return this.addStep();
  }

  addStep = () => {
    this.setStep(this.state.step + 1);
  }

  backStep = () => {
    if (this.state.step === 1) {
      return this.props.toogleModal(false);
    }

    this.setStep(this.state.step - 1);
  }

  render() {
    const { show_modal, main_product, products } = this.props;
    return (
      <Modal
        show={show_modal}
        onHide={() => {
          this.setState(this.initial_state);
          this.props.toogleModal(false)
        }}
        dialogClassName="modal-appointment"
        id={"schedule"}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <div className="slider main-bg-color" style={{
            left: (100 - (100 / this.state.step)) + "%"
          }}>
            {this.state.step !== 1 ? <div className="start main-bg-color"></div> : null}
            {this.state.step !== this.state.max_steps ? <div className="end main-bg-color"></div> : null}
          </div>
          <div className="step-container">
            <span className="step-number">1</span>
            <span className="step-title">Servicios</span>
          </div>
          <div className="step-container last">
            <span className="step-number">2</span>
            <span className="step-title">Ingresa tus datos</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          {main_product && this.state.step === 1 ?
            <div className="modal-appointment-main-product">
              <div className="flex-row-jst-btw">
                <span className="title">{main_product.name}</span>
                <ReactStars
                  count={5}
                  value={genRand(3.5, 5, 2)}
                  edit={false}
                  size={18}
                  color1={"#e6e6e6"}
                />
              </div>
              <div className="flex-row-jst-btw">
                <NumberFormat value={main_product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                <p>{main_product.duration} Min</p>
              </div>
              {main_product.description && main_product.description.trim() !== ""
                ? <><p><strong>Descripción</strong></p>
                  <p className="description">
                    {main_product.description}
                  </p> </>
                : null}
              {products && products.findIndex((item) => item.id === main_product.id) === -1
                ?
                <Button variant="success" size="sm" onClick={() => { this.props.addProduct(main_product) }}>
                  Agregar
              </Button>
                : null}
            </div> : null}



          {this.state.step === 2 ?
            <div className="modal-appointment-form">
              <p className="title">Datos de Reserva</p>
              <Form ref={this.formRef} noValidate validated={this.state.form_validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="start_date">
                  <Form.Label>Fecha</Form.Label>
                  <DatePicker
                    locale="es"
                    className="date-form-control"
                    selected={this.state.start_date}
                    onChange={date => this.onChangeDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    minTime={setHours(setMinutes(new Date(), 0), 7)}
                    maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} controlId="first_name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required type="text" name="first_name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="last_name">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required type="text" name="last_name" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control required type="email" name="email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="telephone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control required type="text" name="telephone"/>
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="notes">
                  <Form.Label>Comentarios</Form.Label>
                  <Form.Control as='textarea' name="notes" />
                </Form.Group>

              </Form>
            </div> : null}


          <div className="modal-appointment-product-list">
            <div className="title">Servicios seleccionados</div>
            <div className="products">
              {products && products.length > 0 ?
                <>
                  <div className="products-lists">
                    {products.map((product) => {
                      return (<div key={product.id} className="flex-row-jst-btw product">
                        <div><span className="btn-remove" onClick={() => { this.props.removeProduct(product) }}>×</span> {product.name}</div>
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      </div>)
                    })}

                  </div>
                  <div className="flex-row-jst-btw total">
                    <strong>Total</strong>
                    <NumberFormat value={products.reduce((total, product) => total + product.price, 0)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </div>
                </>
                :
                <div className="empty">No has agregado ningún servicio</div>
              }
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.backStep}>
            Atrás
            </Button>
          <Button disabled={!products || products.length === 0 || (this.state.step === this.state.max_steps && !this.state.is_valid_date)} variant="success" onClick={this.onClickMainBtn}>
            {this.state.step === this.state.max_steps ? "Crear Reserva" : "Siguiente"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  show_modal: state.appointmentReducer.show_modal,
  main_product: state.appointmentReducer.main_product,
  products: state.appointmentReducer.products,
})

const mapDispatchToProps = (dispatch) => {
  return {
    toogleModal: (show) => dispatch(toogleModal(show)),
    addProduct: (product) => dispatch(addProduct(product)),
    removeProduct: (product) => dispatch(removeProduct(product)),
    createAppointment: (formData, callback) => dispatch(createAppointment(formData, callback)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalAddAppointment)
