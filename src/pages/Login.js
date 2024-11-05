import React from 'react';

const Login = () => {
  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:3000/auth/naver';
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form>
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
      <button onClick={handleNaverLogin} className="naver-login-btn">
        네이버 로그인
      </button>
    </div>
  );
};

export default Login;
