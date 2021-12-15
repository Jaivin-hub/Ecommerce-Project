import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  render() {
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/"><img  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEUAAAD///8wMDDg4OB0dHS/v7/z8/NnZ2e8vLzQ0ND7+/twcHCEhIQ5OTmKioq5ublaWloYGBhUVFTW1tYLCwvFxcVGRkZLS0tRUVEeHh4nJyd+fn4PDw/w8PDn5+cyMjJjY2OEOP5nAAAEZ0lEQVR4nO2da1vjIBBG07iN9dK7Wu/t//+Va113tR0CCFPfmex7Phoewnk6MiQEaEZDp0E34OTQ0D809A8N/UND/9DQPzT0Dw39Q0P/0NA/NPQPDf1DQ//Q0D/5ht14tppuWzzb6Wo27tQNJ/eNLe4mqobzFi0UoJ2rGXYLtEwPi5xYzTBc36BNerlZaxjeojWi3NYbrtEOCZK/Ysqwsxuif7hJ/S+mDK12Mp8s6gzn6PZnkEgaCUOLefCYtsZwgm59FvHRTdxwg258Fptyww7d9kyi3WnUcIxueibjYsMZuumZzIoNV+imZ7IqNpyim57JtNhwi256JttiQw/5fk8059PQBTSkoX1oSEP70JCG9qEhDe1DQxra5+cN738JHkShB1mo9FuBnze8klVdi0LXstCVG8Pli6jqQhS6EGVelm4MQy+hH4+KPMoixfPpAMOMMFUMUkhfKudKjsNUBmn5PBDCMBCmRyVkgfJ5IIThuazsMEw1gxST8WVlh2Eqg/T4R7ZuGAjTr0n/QV6umKyEGCbCNBCk584MAx/yfP26Sn7JVPNpEmbkLcP08rO69lJcrZlRxxgGkv7Tv4tP8mJ5T4oyXMaSfiDdl45JcYax3lS3J4UZRsamqukeZ9jI3uRvmMogvay6E8ow8LnZxxV5oe4DOpRhb9LXTfdAw94wVR2TQg0DSX//pP+om+6RhjtZ4z5MA0G6c2rYk/SV0z3SMDw2VR6TYg2DY1PlMSnWMPhCSvMVFN4wMDZdyj9Vf4oMNAyEaSAZ1gYpdO4pVvtnGzwb5iz0rF/UgTQMjE0FdWNStGFgbHpM3YMT3jC6FOIdhUUdUMN0mNYHKdYwMFl6SPG0qBXDZJhqrDzCGgaS/gHV6b5BGyZ6U4WeFG4YD1OV5XFgw3hvqtCTwg3jY1OVO6ANY2Gqs4YTbRgLU5UghRtGdj1Q2rEBbRgJU6WFxnDD/qSvke4bA4bPfWHaPevcAG7YG6Zaq+Hxhn1hqhSkBgz7bqJVvQHD8AsptX1FDBiGk75Oum9MGAYfoVQenN6xYBjqTfX2FbFgGJgsHe3UardgGHghpfEK6gMLhs2ZqPxMr3Ia0lAFGlZBQxqqQMMqaEhDFWhYBQ1pqAINq6AhDVWgYRU0pKEKNKyChjRUgYZV0JCGKtCwChrSUIXhG76Kyl/1KjdheC42ulT7IsqI4UmhIQ3tQ0Ma2oeGNLQPDWloHxrS0D40/J8Nh38O6fDPkh3+ecDDP9N5+OdyD/9s9dEG3fYsNlGHuKHaWuSTEt/YL7GzoYecH833ScM5uvkZJPZmTO1OuUC3P8kiYZAyVNpB5nT0biuSa3hwsohF5Gkn3zUsPyvsR7hNtj9jl9i13UB9Tv6CWYajzmp3s0j9D+YaviUNi0+Kbc4WvrmGb6Ob0vMlT8Vdnl++4Vusjmer6bbFs52uZuOc+PyuoVdo6B8a+oeG/qGhf2joHxr6h4b+oaF/aOgfGvqHhv6hoX9o6J/hG/4GUk51kpsgUusAAAAASUVORK5CYII=' /></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
             <div  className="nav-item d-none d-lg-block">
               <Link to="/form-elements/basic-elements" style={{textDecoration: 'none'}} className="text-light">
               <button className="nav-link btn btn-success create-new-button no-caret">
              + <Trans >Add New Product</Trans>
              </button>
               </Link>
              </div>
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile">
                  <img className="img-xs rounded-circle" src={require('../../assets/images/faces/face15.jpg')} alt="profile" />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name"><Trans>Jaivin jv</Trans></p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0"><Trans>Profile</Trans></h6>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                   <Link to="/profile"> <p className="preview-subject mb-1 text-light"><Trans>Profile</Trans></p></Link>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1"><Trans>Log Out</Trans></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
