import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLogin } from '../store-manager/actions'
import { fetchProducts } from '../store-manager/actions/ProductActions'
import Header from './Header'
import Services from './Services'
import Footer from './Footer';
class Homepage extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <Header />
        <Services />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(setLogin(null)),
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
