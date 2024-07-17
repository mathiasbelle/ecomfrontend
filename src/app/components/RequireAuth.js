import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const router = useRouter();
    console.log('RequireAuth: ', location);

    return (
        auth?.email
        ? <>{children}</>
        : router.push('/login')
    )
};

export default RequireAuth;

