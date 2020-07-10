import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format'
import ReactStars from 'react-stars'
import moment from 'moment';
import './CustomModal.css'
import 'moment/locale/es';

export class ModalInfoAppointment extends Component {
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
          <Modal.Title>Datos de la Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointment ?
            <>
              <div className="modal-appointment-main-product">
                <div className="flex-row-jst-btw">
                  <span className="title">{`${appointment.user.first_name} ${appointment.user.last_name}`}</span>
                  <ReactStars
                    count={5}
                    value={appointment.rating}
                    //onChange={(value) => this.setState({ rating: value })}
                    edit={false}
                    size={30}
                    color1={"#e6e6e6"}
                  />
                </div>
                <div className="flex-row-jst-btw">
                  <p><strong>Correo Electrónico:</strong> {appointment.user.email}</p>
                  <p><strong>Teléfono:</strong> {appointment.user.telephone}</p>
                </div>
                <div className="flex-row-jst-btw">
                  <p><strong>Fecha Programada:</strong> {moment(appointment.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <p><strong>Estado:</strong> {appointment.status}</p>
                </div>
                {appointment.status === 'REALIZADA' ?
                  <div className="flex-row-jst-btw">
                    <p><strong>Fecha Inicial:</strong> {moment(appointment.start_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p><strong>Fecha Final:</strong> {moment(appointment.end_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div> : null}

                {appointment.notes && appointment.notes.trim() !== ""
                  ? <><p><strong>Notas</strong></p>
                    <p className="description">
                      {appointment.notes}
                    </p> </>
                  : null}

                {appointment.status === 'REALIZADA' && typeof appointment.final_price !== "undefined" ?
                  <p><strong>Precio Final</strong> <NumberFormat value={appointment.final_price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                  : null}
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
      </Modal>
    )
  }
}

export default ModalInfoAppointment
