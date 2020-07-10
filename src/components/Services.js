import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import ReactStars from 'react-stars';
import { getConfig } from '../config';
import ModalAddAppointment from './ModalAddAppointment';
import { toogleModal, addProduct } from '../store-manager/actions/AppointmentActions'
import { genRand } from '../utils'



class Services extends Component {
  render() {
    const { services } = this.props;
    let config = getConfig()
    let apiURL = config.apiURL
    return (
      <Container className='services-container'>
        <ModalAddAppointment />
        <Row>
          {services.map(service => {

            return <Col key={'service-' + service.id} className="service-card-col" md={4} lg={3} sm={12} xs={12}>
              <Card className="service-card" onClick={() => this.props.toogleModal(true, service)}>
                <div className="service-image-container">
                  <Card.Img width={375} height={211} variant="top" src={(service.photos && service.photos.length > 0 ? apiURL + service.photos[0].photo : null)} />
                  <div className="after">
                    <div className="bottom-left"><ReactStars
                      count={5}
                      value={genRand(3.5, 5, 2)}
                      //onChange={ratingChanged}
                      edit={false}
                      size={18}
                      color1={"#e6e6e6"}
                    /></div>
                    <div className="bottom-right service-duration">{service.duration} Min</div></div>

                </div>

                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <div className="card-text">
                    <div className="service-card-footer">
                      <NumberFormat value={service.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      <span className="service-card-btn" onClick={async () => { await this.props.addProduct(service); this.props.toogleModal(true, service); }} >+ Reservar</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>;
          })}
        </Row>
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
    toogleModal: (show, service) => dispatch(toogleModal(show, service)),
    addProduct: async (product) => await dispatch(addProduct(product)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Services)
