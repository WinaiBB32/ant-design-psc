import { Navigate } from 'react-router-dom';
import { getRole } from '../services/auth';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
    const userRole = getRole();
    return userRole ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
