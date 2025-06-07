// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { authUser } = useSelector((store) => store.user);

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
