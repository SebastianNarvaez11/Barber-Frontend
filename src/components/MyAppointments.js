import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { fetchMyAppointments } from '../store-manager/actions/AppointmentActions';
import { connect } from 'react-redux';
import { Table, Container, Form, Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/es';
import ModalInfoAppointment from './ModalInfoAppointment'
import NumberFormat from 'react-number-format'

moment.locale('es');
class MyAppointments extends Component {
  state = {
    search_value: '',
    seleted_appointment: null
  }

  onChangeSearch = (e) => {
    this.setState({
      search_value: e.target.value
    });
  }

  componentDidMount() {
    this.props.fetchMyAppointments();
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

  render() {
    const { my_appointments } = this.props;
    let filtered_list = my_appointments;
    if (this.state.search_value && this.state.search_value.trim() !== "") {
      filtered_list = my_appointments.filter((item) => {
        var jsonstr = `${item.user.first_name} ${item.user.last_name} ${item.date} ${item.estimated_price} ${item.status}`.toLocaleLowerCase();
        var search = this.state.search_value.toLowerCase();
        if (jsonstr.includes(search)) {
          return true;
        }
        return false;
      });
    }


    return (
      <div>
        <Header />
        <ModalInfoAppointment appointment={this.state.seleted_appointment} show_modal={this.state.show_modal} onHide={this.hideModal} />
        <Container className="my-appointments-container">
          <div className="flex-row-jst-btw">
            <h2>Mis Reservas</h2>
            <Form>
              <Form.Group as={Row} controlId="search">
                <Col sm="12">
                  <Form.Control value={this.state.search_value} onChange={this.onChangeSearch} placeholder="Buscar..." />
                </Col>
              </Form.Group>
            </Form>
          </div>
          <Table striped bordered hover size="sm" className="my-appointments-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th style={{
                  width: '30px'
                }}>Cantidad Productos</th>
                <th>Estado</th>
                <th>Precio Estimado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered_list.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{`${item.user.first_name} ${item.user.last_name}`}</td>
                    <td>{`${moment(item.date).fromNow()} - ${moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}`}</td>
                    <td><span className="numSpan">{item.product.length}</span></td>
                    <td>{item.status}</td>
                    <td><NumberFormat value={item.estimated_price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                    <td><Button variant="info" onClick={()=>{
                      this.showModal(item);
                    }}>Info</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    'my_appointments': state.appointmentReducer.my_appointments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMyAppointments: () => dispatch(fetchMyAppointments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);
