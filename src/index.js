import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// jquery
import $ from 'jquery/dist/jquery.min';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');
console.log(bootstrap);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
