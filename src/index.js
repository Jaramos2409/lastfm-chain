import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Header />
, document.getElementById('container'));

registerServiceWorker();
