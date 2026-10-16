// 소셜 로그인 (서버 없이 프론트엔드만으로 동작)
// - 구글: Google Identity Services (팝업 → access token → 사용자 정보 조회)
// - 네이버: 네이버 아이디로 로그인 JS SDK (리다이렉트 → /login 으로 돌아와서 사용자 정보 조회)
//
// 클라이언트 ID는 .env 에 넣는다 (공개돼도 되는 값이지만 코드와 분리)
//   REACT_APP_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
//   REACT_APP_NAVER_CLIENT_ID=xxxx

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;

const GOOGLE_SDK = 'https://accounts.google.com/gsi/client';
const NAVER_SDK = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';

const STORAGE_KEY = 'picker-user';

// ---------- 공통 ----------

function loadScript(src){
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`스크립트 로드 실패: ${src}`));
    document.head.appendChild(script);
  });
}

// 새로고침해도 로그인 유지 (브라우저에 저장)
export function loadUser(){
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
}

export function saveUser(user){
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // 저장이 막힌 환경(시크릿 모드 등)에서는 새로고침 시 로그아웃될 뿐 동작에는 문제 없음
  }
}

// ---------- 구글 ----------

let googleClient = null;
let googleResolver = null;

// 로그인 페이지에 들어오면 미리 불러둔다 (클릭 시점에 바로 팝업을 띄워야 차단되지 않음)
export async function initGoogle(){
  if (!GOOGLE_CLIENT_ID) return false;
  await loadScript(GOOGLE_SDK);

  googleClient = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'openid email profile',
    callback: async (res) => {
      const resolver = googleResolver;
      googleResolver = null;
      if (!resolver) return;

      if (res.error) {
        resolver.reject(new Error(res.error));
        return;
      }
      try {
        const info = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${res.access_token}` },
        }).then(r => r.json());

        resolver.resolve({
          provider: 'google',
          name: info.name,
          email: info.email,
          image: info.picture,
          token: res.access_token,
        });
      } catch (e) {
        resolver.reject(e);
      }
    },
    error_callback: (err) => {
      // 사용자가 팝업을 닫은 경우 등
      if (googleResolver) googleResolver.reject(new Error(err.type || 'popup_closed'));
      googleResolver = null;
    },
  });
  return true;
}

export function googleLogin(){
  return new Promise((resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      reject(new Error('NO_CLIENT_ID'));
      return;
    }
    if (!googleClient) {
      reject(new Error('구글 로그인 준비 중입니다. 잠시 후 다시 시도해 주세요.'));
      return;
    }
    googleResolver = { resolve, reject };
    googleClient.requestAccessToken();
  });
}

function googleLogout(token){
  try {
    if (token && window.google?.accounts?.oauth2) {
      window.google.accounts.oauth2.revoke(token, () => {});
    }
  } catch (e) {}
}

// ---------- 네이버 ----------

let naverLogin = null;

// 네이버 SDK는 화면에 자기 버튼을 그려야 해서, 숨겨둔 #naverIdLogin 에 그리고
// 우리가 만든 버튼을 누르면 그 버튼을 대신 클릭한다.
export async function initNaver(){
  if (!NAVER_CLIENT_ID) return false;
  await loadScript(NAVER_SDK);

  naverLogin = new window.naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: `${window.location.origin}/login`, // 네이버 개발자센터에 등록한 Callback URL과 같아야 함
    isPopup: false,
    loginButton: { color: 'green', type: 1, height: 1 },
  });
  naverLogin.init();
  return true;
}

export function naverLoginStart(){
  if (!NAVER_CLIENT_ID) throw new Error('NO_CLIENT_ID');
  const btn = document.querySelector('#naverIdLogin_loginButton');
  if (!btn) throw new Error('네이버 로그인 준비 중입니다. 잠시 후 다시 시도해 주세요.');
  btn.click(); // 네이버 로그인 페이지로 이동
}

// 네이버 로그인 후 /login#access_token=... 으로 돌아왔을 때 사용자 정보 가져오기
export function naverCheckCallback(){
  return new Promise((resolve) => {
    if (!naverLogin || !window.location.hash.includes('access_token')) {
      resolve(null);
      return;
    }
    naverLogin.getLoginStatus((status) => {
      if (!status) {
        resolve(null);
        return;
      }
      const u = naverLogin.user;
      resolve({
        provider: 'naver',
        name: u.getNickName() || u.getName(),
        email: u.getEmail(),
        image: u.getProfileImage(),
      });
    });
  });
}

// ---------- 로그아웃 ----------

export function logout(user){
  if (user?.provider === 'google') googleLogout(user.token);
  if (user?.provider === 'naver') {
    try { naverLogin?.logout(); } catch (e) {}
  }
  saveUser(null);
}
