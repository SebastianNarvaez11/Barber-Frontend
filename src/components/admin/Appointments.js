import React, { Component } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap';
import { fetchAppointments, startAppointment, denyAppointment } from '../../store-manager/actions/AppointmentActions'
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import ModalInfoAppointment from '../ModalInfoAppointment'
import ModalEditAppointment from './ModalEditAppointment'
import NumberFormat from 'react-number-format'

export class Appointments extends Component {

  state = {
    search_value: '',
    seleted_appointment: null,
    show_modal: false,
    show_modal_edit: false,
  }

  componentDidMount() {
    this.props.fetchAppointments()
  }

  showModal = (appointment) => {
    this.setState({
      show_modal: true,
      seleted_appointment: appointment
    })
  }

  hideModal = () => {
    this.setState({
      show_modal: false,
      seleted_appointment: null
    })
  }

  showModalEdit = (appointment) => {
    this.setState({
      show_modal_edit: true,
      seleted_appointment: appointment
    })
  }

  hideModalEdit = () => {
    this.setState({
      show_modal_edit: false,
      seleted_appointment: null
    })
  }
  render() {
    const { appointments } = this.props;

    return (
      <Container className='mt-5'>
        <ModalInfoAppointment appointment={this.state.seleted_appointment} show_modal={this.state.show_modal} onHide={this.hideModal} />
        <ModalEditAppointment appointment={this.state.seleted_appointment} show_modal={this.state.show_modal_edit} onHide={this.hideModalEdit} />
        <Card border="primary">
          <Card.Header>Reservas</Card.Header>
          <Card.Body>
            <Card.Title> Gestion de Reservas  </Card.Title>
            <div className="table-responsive">
              <Table className="table mt-3" striped hover>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th style={{
                      width: '30px'
                    }}>Cantidad Productos</th>
                    <th>Estado</th>
                    <th>Precio Estimado</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{`${item.user.first_name} ${item.user.last_name}`}</td>
                        <td>{`${moment(item.date).fromNow()} - ${moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}`}</td>
                        <td><span className="numSpan">{item.product.length}</span></td>
                        <td>{item.status}</td>
                        <td><NumberFormat value={item.estimated_price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                        <td>
                          <Button variant="info" onClick={() => {
                            this.showModal(item);
                          }}>Info</Button>
                        </td>
                        <td>
                          {item.status === 'PENDIENTE' ?
                            <Button variant="success" onClick={() => {
                              this.props.startAppointment(item);
                            }}>Iniciar</Button>
                            : <> {item.status === 'EN PROCESO' ? <Button variant="success" onClick={() => {
                              this.showModalEdit(item);
                            }}>Finalizar</Button> : null} </>}
                        </td>
                        <td>
                          {item.status === 'PENDIENTE' ? <Button disabled={!(item.status === 'PENDIENTE')} variant="danger" onClick={() => {
                            this.props.denyAppointment(item);
                          }}>Rechazar</Button> : null}
                        </td>
                      </tr>
                    );
                  })}
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
    'appointments': state.appointmentReducer.appointments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAppointments: () => dispatch(fetchAppointments()),
    startAppointment: (appointment) => dispatch(startAppointment(appointment)),
    denyAppointment: (appointment) => dispatch(denyAppointment(appointment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);