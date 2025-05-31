import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';

const HomeRoutes = () => [
    <Route key="home" path="/" element={<Home />} />,
];

export default HomeRoutes; 