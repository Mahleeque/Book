import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');
createRoot(root).render(<App />);
