import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';

const App = (props) => (
  <div className={props.className || ''}>
    <Navbar />
    {props.children}
  </div>
);

export const ContainerApp = (props) => (
  <div className={props.className || ''}>
    <Navbar />
    <div className='container-fluid'>
      {props.children}
    </div>
  </div>
);

export default App;
