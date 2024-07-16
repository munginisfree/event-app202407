import React, {useEffect, useState} from 'react';
import LoginForm from "../components/auth/LoginForm";
import Main from "../components/Main";

const WelcomePage = () => {
    console.log('Welcome page 실행!!');

    return (
        <>
            {<LoginForm/>}
            {<Main/>}
        </>
    );
};

export default WelcomePage;