import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Frontend from './frontend'; // Import your Frontend component

ReactDOM.render(
  <React.StrictMode>
    <Frontend /> {/* Render your Frontend component */}
  </React.StrictMode>,
  document.getElementById('root')
);

