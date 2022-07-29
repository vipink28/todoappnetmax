import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';

function Home(props) {
    return (
        <div className="container-fluid main">
        <div className="row h-100">
            <div className="col-xl-6 bg-primary h-100 d-flex flex-column align-items-center justify-content-center">
                <h2 className="home-title text-white mb-5 display-4 text-uppercase text-center">
                    An App to<br />
                    make your life
                    <span className="d-block display-1 fw-bold">easy</span>
                </h2>
                <img className="img-fluid" src="illustration.png" alt="illustration" />
            </div>
            <div className="col-xl-6 d-flex align-items-center">
                <div className="row flex-grow-1 justify-content-center">
                    <div className="col-xl-8 user-form">
                        <div className="card">
                            <div className="card-header d-flex p-0">
                                <NavLink className="w-50 text-center py-3" activeclassname="active" to="sign-in">Login</NavLink>
                                <NavLink className="w-50 text-center py-3" to="sign-up">Register</NavLink>
                            </div>
                            <div className="card-body p-5">
                               <Outlet />                                          
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default Home;