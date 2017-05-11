import React from 'react';
import ReactDOM from 'react-dom';

import MyPressMain from './mypress-main';

const MyPressRootElement = document.getElementById('mypress-root');

if (MyPressRootElement) {
    ReactDOM.render(
        <MyPressMain />,
        MyPressRootElement
    );
}
