// import liff from '@line/liff';
// import { useEffect } from 'react';
// import { useAsync } from 'react-use';
import useLineLiff from '@hook/line/liff';
import { useEffect, useState } from 'react';
function Line() {
    // const { user, getUser, logout } = useLiff();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);
    const { user, logout, getUser, login, isLoggedIn } = useLineLiff(false);

    return (
        <div>
            {loggedIn && (
                <>
                    <h1>Line Page</h1>
                    <div className="text-9xl text-red-500"></div>
                    <button className="bg-green-500 rounded-full p-4 m-4" onClick={login}>
                        LogIn
                    </button>
                    <button className="bg-amber-500 rounded-full p-4 m-4" onClick={getUser}>
                        Get User Info
                    </button>
                    <button
                        className="bg-yellow-500 rounded-full p-4 m-4"
                        onClick={() => console.log(user)}
                    >
                        打印
                    </button>
                    <button
                        className="bg-blue-500 text-white rounded-full p-4 m-4"
                        onClick={logout}
                    >
                        登出
                    </button>
                </>
            )}
        </div>
    );
}

export default Line;
