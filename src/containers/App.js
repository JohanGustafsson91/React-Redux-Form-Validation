import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-select/dist/react-select.css';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../styles/_stylesheet.scss';
import Menu from '../components/menu/Menu';

const App = React.createClass({

  propTypes: {
    dispatch: PropTypes.func,
    children: PropTypes.object
  },

  /**
   * Specify the different types of menu items
   * for the application in the initial state.
   *
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  getInitialState () {
    return {
      guestMenuItems: [
        {name: 'Home', handler: this._redirectTo, url: '/'}
      ],
      authMenuItems: [
        {name: 'Home', handler: this._redirectTo, url: '/'}
      ]
    };
  },

  /**
   * @return {[Menu]} [Correct menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenu () {
    // Get specifik menu options
    let menuItems = this._getMenuItems();
    let menuBrand = this._getMenuBrand();

    return (
      <Menu
        menuItems={menuItems}
        menuBrand={menuBrand} />
    );
  },

  /**
   * @return {[array]} [Array with correct menu items for menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenuItems () {
    return this.state.guestMenuItems;
  },

  /**
   * @return {[object]} [Menu brand]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenuBrand () {
    return {
      name: 'Welcome guest',
      handler: this._redirectTo,
      url: '/'
    };
  },

  /**
   * @param  {[string]} url [the new url]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _redirectTo (url) {
    this.props.dispatch(
      routeActions.push(url)
    );
  },

  render () {
    return (
      <div>
        {
          this._getMenu()
        }
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default connect()(App);
