import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';

if (document.getElementById('root').hasChildNodes()) {
    ReactDOM.hydrateRoot( document.getElementById('root'), <App />);
} else {
    ReactDOM.createRoot(document.getElementById('root')).render( <App />);
}
