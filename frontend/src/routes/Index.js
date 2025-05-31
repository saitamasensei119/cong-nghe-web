import React from 'react';
import AuthRoutes from './AuthRoutes';
import ExamRoutes from './ExamRoutes';
import AdminRoutes from './AdminRoutes';
import HomeRoutes from './HomeRoutes';

const AppRoutes = () => ([
    ...HomeRoutes(),
    ...AuthRoutes(),
    ...ExamRoutes(),
    ...AdminRoutes(),
]);

export default AppRoutes;