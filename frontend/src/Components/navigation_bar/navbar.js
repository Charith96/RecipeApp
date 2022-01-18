import React, { useState, useEffect } from "react";
import img1 from '../images/logo.png';
import { Link } from 'react-router-dom';
import './navbar_style.css';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);


    //refresh page manually
    const refreshPage = () => {
        window.location.reload();
    }

    const changeNavBackgroundColor = () => {
        if(window.scrollY >= 100) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeNavBackgroundColor);

    return (
        <>
            {/* navigation bar component */}
            <div className="custom-navbar">
                <nav className="navbar active fixed-top navbar-expand-lg navbar-dark p-md-3">
                    <div className="container">
                        <a className="navbar-brand" href="#sec-1">Cook & Bake</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="mx-auto"></div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#sec-2">Recipes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">Blog</a>
                                </li>
                                <ul className="navbar-nav ms-auto">
                                    <a className="btn" onClick={() => refreshPage()}><i className="fas fa-sync"></i>&nbsp;&nbsp;Refresh</a>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>


        </>
    )
}


