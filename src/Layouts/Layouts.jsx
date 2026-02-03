import React from 'react';
import Navbar from '../Pages/Sheard/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Sheard/Footer';
import ScrollToTop from '../Pages/Sheard/ScrollToTop';

const Layouts = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layouts;