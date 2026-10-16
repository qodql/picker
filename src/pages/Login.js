import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  initGoogle, googleLogin,
  initNaver, naverLoginStart, naverCheckCallback,
  saveUser,
} from '../api/auth';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const finishLogin = (userInfo) => {
    saveUser(userInfo);
    dispatch({ type: 'LOGIN_SUCCESS', data: userInfo });
    navigate('/', { replace: true });
  };

  // 로그인 화면에서만 body에 클래스를 붙여 배경을 화면 전체(헤더·푸터 뒤까지)로 깔아준다
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => document.body.classList.remove('login-page');
  }, []);

  useEffect(() => {
    // 이미 로그인한 상태면 메인으로
    if (user) {
      navigate('/', { replace: true });
      return;
    }

    initGoogle().catch(() => {});

    // 네이버 로그인 후 돌아온 경우(#access_token=...) 사용자 정보 받아서 로그인 처리
    initNaver()
      .then(() => naverCheckCallback())
      .then((naverUser) => {
        if (naverUser) finishLogin(naverUser);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showError = (e) => {
    if (e.message === 'NO_CLIENT_ID') {
      alert('클라이언트 ID가 설정되지 않았습니다. .env 파일을 확인해 주세요.');
    } else if (e.message !== 'popup_closed' && e.message !== 'access_denied') {
      alert(e.message);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      finishLogin(await googleLogin());
    } catch (e) {
      showError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleNaver = () => {
    try {
      naverLoginStart();
    } catch (e) {
      showError(e);
    }
  };

  return (
    <div className='login'>
      <div className='login-inner'>
        <h2 className='login-tit'>
          로그인 방법을 선택해 주세요
        </h2>

        <div className='login-btns'>
          <button type='button' className='login-social naver' onClick={handleNaver} disabled={loading}>
            <span className='login-icon' aria-hidden='true'>
              <svg viewBox='0 0 20 20' width='18' height='18'>
                <path fill='#fff' d='M13.56 10.7 6.17 0H0v20h6.44V9.3L13.83 20H20V0h-6.44z' />
              </svg>
            </span>
            네이버로 계속하기
          </button>

          <button type='button' className='login-social google' onClick={handleGoogle} disabled={loading}>
            <span className='login-icon' aria-hidden='true'>
              <svg viewBox='0 0 48 48' width='22' height='22'>
                <path fill='#EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z' />
                <path fill='#4285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z' />
                <path fill='#FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z' />
                <path fill='#34A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z' />
              </svg>
            </span>
            Google로 계속하기
          </button>
        </div>

        {/* 네이버 SDK가 자기 버튼을 그리는 자리 (화면에는 숨김) */}
        <div id='naverIdLogin' className='naver-sdk-btn' />
      </div>
    </div>
  );
};

export default Login;
