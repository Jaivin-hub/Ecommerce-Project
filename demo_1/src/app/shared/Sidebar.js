import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="col-12 sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <h2>YourOwn</h2>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/faces/face15.jpg')} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal"><Trans>Jaivin jv</Trans></h5>
                  <span><Trans>Gold Member</Trans></span>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans></Trans></span>
          </li>

          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          <li className={this.isPathActive('/basic-ui/buttons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/basic-ui/buttons">
              <span className="menu-icon"><i className="mdi mdi-laptop"></i></span>
              <span className="menu-title"><Trans>Product <br /> Management</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/buttons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/sailes">
              <span className="menu-icon"><i className="mdi mdi-laptop"></i></span>
              <span className="menu-title"><Trans>Sailes <br /> Report</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.categoryMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('categoryMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Category <br /> Management</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.categoryMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/category"><Trans>Add Category</Trans></Link></li>
                </ul>
              </div>
              
            </Collapse> 
            {/* <Collapse in={this.state.categoryMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/categoryDetails"><Trans>Category details</Trans></Link></li>
                </ul>
              </div>
            </Collapse> */}
            <Collapse in={this.state.categoryMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/subcategory"><Trans>Sub Category</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li className={this.isPathActive('/buttons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/orders">
              <span className="menu-icon"><i className="mdi mdi-laptop"></i></span>
              <span className="menu-title"><Trans>OrderManagement</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.categoryMenuopen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('categoryMenuopen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>OfferManagement</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.categoryMenuopen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/offermanagement"><Trans>Coupon</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
            <Collapse in={this.state.categoryMenuopen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/categoryOffers"><Trans>Category</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/buttons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/tables/basic-table">
              <span className="menu-icon"><i className="mdi mdi-table-large"></i></span>
              <span className="menu-title"><Trans>UsersManagement</Trans></span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);