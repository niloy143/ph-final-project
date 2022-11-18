import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BodySpinner from '../../components/BodySpinner';
import { PhContext } from '../../Contexts/Contexts';
import useAdmin from '../../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, userLoading } = useContext(PhContext);
    const [isAdmin, adminLoading] = useAdmin(user?.uid);
    const { state } = useLocation();

    return userLoading || adminLoading ? <BodySpinner /> : isAdmin ? children : <Navigate to={state || '/'} />;
};

export default AdminRoute;