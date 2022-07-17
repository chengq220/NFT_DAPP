import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import 'bootstrap/dist/css/bootstrap.min.css';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
   document.getElementById('root')
);
