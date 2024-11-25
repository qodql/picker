

<!-- logo -->
<p><img src="https://github.com/qodql/picker/blob/main/src/assets/img/logo-black.svg" width="250" height="130"/></p>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-html.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-css.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-sass.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-figma.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-swiper.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-npm.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-js.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-react.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-redux.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-vercel.svg"/>
<img src="https://github.com/qodql/vue-portfolio/blob/main/assets/img/icon/icon-project-git.svg"/>

## 📝 프로젝트 소개
picker는 TMDB API를 활용한 영화 정보 제공 사이트 입니다.

## 🗓 프로젝트 일정
**총 일정 2024.09.11 ~ 2024.09.25(15일), 1인**


## 🔗 배포 URL
<a href="https://picker-ykb.vercel.app/" target="_blank">https://picker-ykb.vercel.app/</a>
<br />


## 🖥 화면 구성
<img src="https://github.com/qodql/picker/blob/main/src/assets/img/readme/main.png">

## ⚙ 기술 스택
이 프로젝트는 React 프레임워크로 구현되었습니다.

- **React**: 프론트엔드 프레임워크, 컴포넌트 기반 UI를 구현
- **React-Redux**: 전역상태관리
- **Axios**: API 통신을 위한 HTTP 클라이언트
- **SASS**: CSS 방식으로 컴포넌트 스타일링
- **Vercel**: 배포 플랫폼 (배포 사이트: [https://picker-ykb.vercel.app/](https://picker-ykb.vercel.app/))
- **GitHub**: 버전 관리 및 협업 도구
<br />

## 🛠 주요 기능 및 특징
1. **메인 화면**:
   - 메인 화면은 메인 슬라이드, 영화, 애니메이션, 장르별 랭킹으로 구현되어 있습니다.
   - 영화나 애니메이션의 더 보기 버튼을 누르면 해당 장르 리스트 페이지가 출력 됩니다.
   - 마지막 섹션의 탭 메뉴는 각 장르별 랭킹 순서로 리스트가 출력 됩니다.

2. **영화 목록 페이지**:
   - 화면 상단의 메뉴나 메인 페이지의 더 보기 버튼을 누르게 되면 각 리스트가 출력 됩니다.

3. **영화 상세 페이지**:
   - 사용자가 영화 제목이나 이미지를 클릭하면 영화의 상세 정보를 확인할 수 있는 페이지로 이동합니다.
   - 상세페이지에는 라우팅 처리를 통해 각 영화에 고유 URL을 부여하여 사용자가 특정 영화 정보를 쉽게 확인할 수 있도록 했습니다.

4. **검색 기능**:
   - 상단의 검색창을 통해 사용자가 원하는 영화를 검색할 수 있습니다.
   - 검색어 입력 후, 검색 결과 페이지로 이동합니다.
<br />

## 🤔 기술적 이슈와 해결 과정

### 1. **전역 상태 관리 방법에 대한 고민**

 - 문제: 프로젝트 초기에는 전역 상태 관리가 필요했지만, 어떤 도구를 사용할지 명확하지 않았습니다. 컴포넌트 간의 데이터 전달이 복잡해지고 상태 관리 로직이 중복되면서 코드 유지보수가 어려워지는 문제가 발생했습니다.

 -  해결: React-Redux를 도입하여 전역 상태를 체계적으로 관리하기로 결정했습니다. Redux를 통해 상태를 효율적으로 관리하고, 컴포넌트 간 데이터 흐름을 일관되게 유지할 수 있었습니다.


### 2. **상세페이지 새로고침 시 초기화 문제**

 - 문제: 사용자가 브라우저의 새로고침을 했을 때, 라우팅으로 인해 상태가 초기화되면서 영화 정보가 사라지는 문제가 발생했습니다.

 - 해결: 각 영화의 ID를 기반으로 API에서 데이터를 다시 가져오는 로직을 구현했습니다. useParams를 활용해 URL에서 ID를 추출하고, 해당 ID로 API 요청을 보냄으로써 상세 정보를 항상 올바르게 표시할 수 있었습니다.
<br />

##  :file_folder: 폴더 구조
<pre class="notranslate">
<code>
📦picker
 ┣ 📂src                 # 소스 코드 디렉토리
 ┃ ┣ 📂api               # API 관리 폴더
 ┃ ┃ ┣ tmdb.js            # tmdb API
 ┃ ┣ 📂assets            # css, 이미지, 폰트 관리 폴더
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┣ 📂img
 ┃ ┣ 📂components        # 컴포넌트 폴더
 ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┣ 📜MoovieList.js
 ┃ ┃ ┣ 📜Search.js
 ┃ ┣ 📂pages             # 페이지 폴더
 ┃ ┃ ┣ 📜Main.js           
 ┃ ┃ ┣ 📜Details.js 
 ┃ ┣ 📜App.js            #Route 관리 파일
 ┃ ┣ 📜index.js          # React-Redux 사용 상태관리
 ┗ 📜README.md
 </code>
 </pre>







