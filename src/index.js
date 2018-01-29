import AppComponent from './components/Main';
import React from 'react';
import ReactDOM from 'react-dom';


// Render the main component into the dom


start = function(order) {
  // alert("start!!::"+order+":"+app);
  app.handleStart(order);
}


var app = ReactDOM.render(<AppComponent />, document.getElementById('app'));
