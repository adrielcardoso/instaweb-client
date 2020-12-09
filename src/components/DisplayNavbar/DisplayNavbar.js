import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import "./DisplayNavbar.css";

const DisplayNavbar = props => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom fixed-top">
      <div className="container d-flex justify-content-start">
        {!localStorage.Auth ? <Link
          className="navbar-brand d-sm-block"
          to={localStorage.Auth ? "/posts" : "/"}
        >
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3524/3524440.svg"
            alt=""
            width="40"
          />
          <label style={{
                position: 'absolute',
                paddingTop: '5px',
                fontFamily: 'monospace'
          }}>Instagrão</label>
        </Link>: <p/>}

        {localStorage.Auth && (
          <div className="collapse navbar-collapse" id="navbarNav">
           
            <Link
              className="navbar-brand d-none d-sm-block"
              to={localStorage.Auth ? "/posts" : "/"}
            >
              <img
                src="https://jbssocial.s3-sa-east-1.amazonaws.com/seara-logo-2.png"
                alt=""
                width="60"
              />
            </Link>
            {/* <form className="form-inline ml-auto">
              <input
                type="text"
                className="form-control form-control-sm bg-light text-center"
                placeholder="Search"
              />
            </form> */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/posts/new">
                  <Icon.Edit className="navIcons" size={25} />
                </Link>
              </li>
              <li className="nav-item active ml-3 mr-3">
                <Link className="nav-link" to="/explore">
                  <Icon.Compass className="navIcons" size={25} />
                </Link>
              </li>
              <li className="nav-item active mr-3">
                <Link
                  className="nav-link"
                  to={`/users/${JSON.parse(localStorage.getItem("Auth")).id}`}
                >
                  <Icon.User className="navIcons" size={25} />
                </Link>
              </li>
               {
                  localStorage.Auth && JSON.parse(localStorage.getItem("Auth")).isAdm && 
                  (
                    <li className="nav-item active ml-3 mr-3">
                      <Link className="nav-link" to="/backoffice">
                        <Icon.Archive className="navIcons" size={25} />
                      </Link>
                    </li>
                  )
                }
                <li className="nav-item active">
                  <div className="nav-link">
                    <Icon.LogOut
                      className="navIcons"
                      size={25}
                      onClick={props.logout}
                    />
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DisplayNavbar;
