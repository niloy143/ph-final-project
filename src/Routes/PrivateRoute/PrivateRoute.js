import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BodySpinner from '../../components/BodySpinner';
import { PhContext } from '../../Contexts/Contexts';

const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useContext(PhContext);
    const { pathname } = useLocation();

    return userLoading ? <BodySpinner /> : user ? children : <Navigate to="/login" state={pathname} />;
};

export default PrivateRoute;