import { useEffect } from 'react';

import { useAuth } from '../../auth/context/AuthProvider';

const ChatPage = () => {
    const { accessToken } = useAuth();

    useEffect(() => {
    }, [accessToken]);

    return(
        <div className={"justify-center text-center mt-3"}> AUN NO IMPLEMENTADO</div>
    )
};

export default ChatPage;
