/**
 * Componente responsable de generar la barra lateral de la aplicacion,
 * la cual permanecerá visible en  todas las vistas de la aplicacion.
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Link,
} from "react-router-dom";

export class Sidebar extends Component {
  render() {
    const { barber } = this.props;
    return (
      <div className="bg-primary" id="sidebar-wrapper">
        <div className="sidebar-heading text-center mt-1 pro-img">
          <Link to='/'><img
            alt=""
            src={barber.logo}
            className="profile-pic imagen_cover img-thumbnail"
          />{' '}</Link>

          <br />
          <div className='text-white text-center'>
            {barber.name}
          </div>
        </div>
        <div className="list-group list-group-flush">
          <Link to='/' className="list-group-item list-group-item-action bg-primary text-white">
            <i className="fas fa-home"></i>  Home
          </Link>
          <Link to='/admin/' className="list-group-item list-group-item-action bg-primary text-white">
            <i className="fas fa-chart-bar"></i>  Reportes
          </Link>
          <Link to='/admin/users' className="list-group-item list-group-item-action bg-primary text-white">
            <i className="fas fa-users"></i>  Usuarios
          </Link>
          <Link to='/admin/services' className="list-group-item list-group-item-action bg-primary text-white">
            <i className="fas fa-barcode"></i>  Servicios
          </Link>
          <Link to='/admin/appointments' className="list-group-item list-group-item-action bg-primary text-white">
            <i className="fas fa-calendar"></i>  Reservas
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    'barber': state.general.barber
  };
};

export default connect(mapStateToProps)(Sidebar);
