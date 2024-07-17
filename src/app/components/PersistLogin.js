'use client';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    }, [auth, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`auth: ${JSON.stringify(auth?.accessToken)}`);
    }, [auth, isLoading]);

    return (
        <>{isLoading ? <p>Loading...</p> : <>{children}</>}</>
    )
};

export default PersistLogin;
