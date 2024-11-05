// src/components/NaverLogin.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

const NaverLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { naver } = window;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'fj2WvQTOmkIhKHJZW67L',
      callbackUrl: 'http://localhost:3000/auth/naver/callback',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 50 },
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async (status) => {
      if (status) {
        const email = naverLogin.user.getEmail();
        const name = naverLogin.user.getName();
        
        if (!email) {
          alert('이메일 정보 제공 동의가 필요합니다.');
          naverLogin.reprompt();
          return;
        }

        dispatch(loginSuccess({ email, name }));
        navigate('/');
      }
    });
  }, [dispatch, navigate]);

  return (
    <div>
      <div id="naverIdLogin" />
    </div>
  );
};

export default NaverLogin;
