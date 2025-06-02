import AuthRoutes from './AuthRoutes';
import ExamRoutes from './ExamRoutes';
import AdminRoutes from './AdminRoutes';
import HomeRoutes from './HomeRoutes';

const AppRoutes = () => {
    return [
        ...HomeRoutes(),
        ...AuthRoutes(),
        ...ExamRoutes(),
        ...AdminRoutes()
    ];
};

export default AppRoutes;