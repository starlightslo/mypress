import React, { Component } from 'react';

import Header from './mypress-header';
import Slider from './mypress-slider';
import About from './mypress-about';
import Portfolio from './mypress-portfolio';
import Skill from './mypress-skill';
import Experience from './mypress-experience';
import Footer from './mypress-footer';

class MyPressMain extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Slider />
                <About />
                <Portfolio />
                <Skill />
                <Experience />
                <Footer />
            </div>
        );
    }
};

export default MyPressMain;
