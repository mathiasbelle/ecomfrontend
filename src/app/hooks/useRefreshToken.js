import useAuth from "./useAuth";
import axios from "../api/axios";


const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const res = await axios.get('/auth/refresh', {
                withCredentials: true
            });
            setAuth(prev => {
                console.log('PREV');
                console.log(JSON.stringify(prev));
                console.log('NEW');
                console.log(res.data.accessToken);
                return { ...prev, accessToken: res.data.accessToken, role: res.data.role };
            });
            return res.data.accessToken;
        } catch (err) {
            console.log(err);
        }
    }
    return refresh;
}

export default useRefreshToken;