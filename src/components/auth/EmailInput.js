import React, {useEffect, useRef, useState} from 'react';
import styles from './SignUpForm.module.scss';
import {AUTH_URL} from '../../config/host-config';

const EmailInput = () => {

    const inputRef = useRef();

    // 입력한 이메일
    const [enteredEmail, setEnteredEmail] = useState('');

    // 검증 여부
    const [emailValid, setEmailValid] = useState(false);

    // 에러 메세지
    const [error, setError] = useState('');

    // 이메일 패턴 검증
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사
        return emailPattern.test(email);
    };

    // 이메일 검증 후속 처리
    const checkEmail = async (email) => {
        if (!emailValid) {
            // 에러 메세지 세팅
            setError('이메일 형식이 유효하지 않습니다.');
            return;
        }
        // 중복 검사

        const response = await fetch(`${AUTH_URL}/check-email?email=${email}`);
        // console.log(response);
        const flag = await response.json();

        // console.log('flag: ', flag);
        if (flag) {
            setEmailValid(false);
            setError('이메일이 중복되었습니다.');
        }
    };

    const changeHandler = e => {
        const email = e.target.value;
        const isValid = validateEmail(email);
        // console.log('isValid: ', isValid);

        setEnteredEmail(email);
        setEmailValid(isValid);

        // 이메일 검증 후속처리
        checkEmail(email);
    };

    // 랜더링 되자마자 입력창에 포커싱
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <>
            <p>Step 1: 유효한 이메일을 입력해주세요.</p>
            <input
                ref={inputRef}
                type="email"
                placeholder="Enter your email"
                onChange={changeHandler}
                className={!emailValid ? styles.invalidInput : ''}
            />
            {!emailValid && <p className={styles.errorMessage}>{error}</p>}
        </>
    );
};

export default EmailInput;