import React, { Component } from 'react'
import './Footer.css'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { SocialIcon } from 'react-social-icons';

export class Footer extends Component {
  render() {
    const mapStyles = {
      width: '400px',
      height: '200px',
    };
    return (
      <footer className="page-footer font-small teal pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase font-weight-bold">BarberShop</h5>
              <p>La mejor barbería en el sur de Cali</p>
              <SocialIcon network="facebook" />
              <SocialIcon network="twitter" />
              <SocialIcon network="instagram" />
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-6 mb-md-0 mb-3">
              <h5 className="text-uppercase font-weight-bold">Contáctanos</h5>
              <div className="map-container">
                <Map
                  google={this.props.google}
                  zoom={8}
                  style={mapStyles}
                  initialCenter={{ lat: 47.444, lng: -122.176 }}
                />
              </div>
              <span><strong>Dirección:</strong> 742 Evergreen Terrace</span>
              <br />
              <span>3145478954 - 4578115</span>
              <br />
              <span>contacto@barbershop.gq</span>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">© 2020 Copyright:<a href="https://barbershop.gq/"> Barbershop</a></div>
      </footer>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCc3HtcNF2yVT6kc_lzDRQvIxFy6VL26oY'
})(Footer);
