import React from 'react';
import { Route } from 'react-router-dom';
import ExamPage from '../pages/ExamPage/ExamPage';
import TakeExamPage from '../pages/TakeExamPage/TakeExamPage';
import StatisticsPage from '../pages/StatisticsPage/StatisticsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import ExamManagement from '../pages/ExamManagement/ExamManagement';
import QuestionPage from '../pages/QuestionPage/QuestionPage';

const ExamRoutes = ({ user, onLogout }) => ([
    <Route path="/" element={
        <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <ExamPage user={user} />
        </ProtectedRoute>
    } key="exam-home" />,
    <Route path="/exam/:id" element={
        <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <TakeExamPage user={user} />
        </ProtectedRoute>
    } key="take-exam" />,
    <Route path="/statistics" element={
        <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <StatisticsPage user={user} />
        </ProtectedRoute>
    } key="statistics" />,
    <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <ProfilePage user={user} onLogout={onLogout} />
        </ProtectedRoute>
    } key="profile" />,
    <Route path="/exams/subject/:subjectId" element={
        <ProtectedRoute allowedRoles={['teacher', 'admin', 'student']}>
            <ExamManagement />
        </ProtectedRoute>
    } key="exam-management" />,
    <Route path="/question-bank/:subjectId" element={
        <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <QuestionPage/>
        </ProtectedRoute>
    } key="question-bank" />,
]);

export default ExamRoutes;