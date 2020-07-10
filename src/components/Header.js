/**
 * Componente responsable de generar la barra superior de la aplicacion,
 * la cual permanecerá visible en  todas las vistas de la aplicacion.
 */

import React, { Component } from 'react'
import { Nav, DropdownButton, Dropdown, Button } from 'react-bootstrap';

import { setLogin } from '../store-manager/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getConfig } from '../config';
import {
  Link,
} from "react-router-dom";

export class Header extends Component {
  state = {
    color: 'primary'
  }

  setColor = () => {
    this.state.color === 'primary' ? this.setState({ color: 'dark' }) : this.setState({ color: 'primary' })
  }

  onLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const { current_user, barber, is_logged } = this.props;
    let config = getConfig()
    return (
      <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <Link to="/"><img
          alt=""
          src={barber.logo}
          className="profile-pic header-logo"
        /></Link>
        <Link to="/" className="navbar-brand">{barber.name}</Link>
        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {is_logged ?
              <>
                <img src={`${config.staticURL}/media/profile.png`} alt="user" className="profile-pic2 imagen_cover" />
                <DropdownButton className='derecha' alignRight title={current_user.name + " " + current_user.last_name} id="dropdown-menu-align-right" variant='link'>
                  <Link to="/appointments" className="dropdown-item" role="button">Mis Reservas</Link>
                  {current_user.role === 'ADMIN' ? <Link to="/admin" className="dropdown-item" role="button">Administración</Link> : null}
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" onClick={this.onLogout}>Salir</Dropdown.Item>
                </DropdownButton></>
              : <Link to="/login" >Ingresar</Link>}
          </ul>
        </div>
      </Nav>
    )
  }
}



const mapStateToProps = state => {
  return {
    'current_user': state.general.current_user,
    'is_logged': state.general.is_logged,
    'barber': state.general.barber,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    'logout': () => {
      dispatch(setLogin(false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

