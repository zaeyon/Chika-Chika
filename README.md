# 치카치카 - 개인 맞춤형 치과 서비스
<div align="left">
<img width="40%" src="./src/Assets/Images/pages/소개.jpg"/>
<img width="40%" src="./src/Assets/Images/pages/소개2.jpg"/>
</div>
</br>

## 📝 프로젝트 개요
### • 주제
치카치카는 인터넷상 무분별한 치과 광고와 개인간의 입소문으로만 전해지는 정보에 의해 </br>
나에게 맞고 믿을 수 있는 치과를 찾지 못하는 문제를 해결하기 위해 기획된 프로젝트입니다.</br>
</br>
### • 기간

1. **서비스 기획 및 개발** <br/>
2020.10 ~ 2021.02 
2. **MVP 테스트 및 오류 개선** <br/>
2021.02 ~ 2021.03
3. **iOS, Android 스토어 출시 (현재 삭제됨)** <br/>
2021.03
</br>

### • 대표 사진
<div>
<img width="24.5%" src="./src/Assets/Images/pages/맞춤형치과지도.jpg"/>
<img width="24.5%" src="./src/Assets/Images/pages/영수증리뷰.jpg"/>
<img width="24.5%" src="./src/Assets/Images/pages/정보공유.jpg"/>
<img width="24.5%" src="./src/Assets/Images/pages/지역기반치과정보.jpg"/>
</div>
</br>

### • 참여
|이름|담당|기능|
|----|---|---|
|이재연 [(zaeyon)](github.com/zaeyon)|프론트엔드|로그인/회원가입, 치과지도, 리뷰작성 기능 담당|
|이태규 [(postmelee)](github.com/postmelee)|프론트엔드|커뮤니티, 홈화면 기능 담당|
|정지원 [(jiwon11)](https://github.com/jiwon11)|백엔드|백엔드 전체 기능 담당|
|전윤정|디자인||
<br/>

### • UX/UI 디자인 작업물

[https://www.figma.com/file/379hsp6EJLspQgODns9qjf/chikachika_iOS?type=design&node-id=1745-65052&t=Na9cDQTeIjVM9JH1-0](https://www.figma.com/file/379hsp6EJLspQgODns9qjf/chikachika_iOS?type=design&node-id=1745-65052&t=Na9cDQTeIjVM9JH1-0)

## 🛠️ 기술 스택

### • Platform - iOS, Android

React-Native를 사용하여 iOS, Android를 모두 지원하는 하이브리드앱으로 개발하였습니다.

### • 프로그래밍 언어 - JavaScript, TypeScript

타입 에러를 방지하기 위해 TypeScript를 도입하여 기존의 JavaScript와 함께 사용하였습니다.

### • UI 라이브러리 - React-Native

빠른 개발과 테스트가 중요한 스타트업이므로 iOS, Android 앱을 한번에 만들 수 있는 React-Native를 선택하여 하이브리드 앱을 만들었습니다.

### • CSS-In-JS 라이브러리 - styled-components

styled-components를 사용하여 CSS 코드를 JS파일안에 작성함으로써 생산성을 높였습니다.

### • HTTP 비동기 통신 라이브러리 - Axios

Axios를 사용하여 비동기 API를 연동하였습니다.

### • 전역 상태 관리 - Redux

서비스에서 사용되는 사용자의 로그인 데이터, 치과 데이터와 같이 전역으로 사용되는 데이터를 관리하기 위해 Redux를 사용하였습니다.  

### • 디자인 패턴 - Container & Presentational Component

Container 컴포넌트에선 비즈니스 로직과 상태 관리, 라우팅에 대한 코드를 작성하고 사용자한테 보여지는 UI에 대한 코드는 Presentational 컴포넌트로 나눠서 작성하여 코드의 재사용성과 유지보수를 용이하게 하였습니다.

### • 지도 - Naver Map API

사용자가 치과의 위치를 보다 시각적으로 확인하기 위해 네이버 지도 API를 연동하였습니다.

<br/>

## 주요 기능
### 1. 휴대폰 번호 회원가입/로그인
- 사용자가 휴대폰 번호 문자 인증을 통해 회원가입을 하면 서버에서 jwtToken을 생성하여 응답합니다. </br>
응답받은 jwtToken은 클라이언트에 저장하여 사용자가 어플 재실행 시 자동 로그인 되도록 구현하였습니다. </br>
<br/>
<img width="30%" src="https://user-images.githubusercontent.com/49143255/239903233-d5945c64-1bf0-4071-9e84-353878f53b36.gif"/>
<br/>


### 2. 지도상 원하는 위치의 치과 검색
- 네이버 지도 API를 연동하여 사용자는 주변 위치, 원하는 위치에서 치과를 검색 할 수 있습니다. </br>
또한 방문일자, 교정 전문의, 야간 진료, 일요일/공휴일 진료와 같은 상세한 필터링을 통해 사용자는 보다 자신에게 치과를 찾을 수 있습니다.

<br/>
<img width="30%" src="https://user-images.githubusercontent.com/49143255/239910004-b8eeb8e0-d562-432f-bae5-3ca4e768ace8.gif"/>
<br/>


### 3. 상세한 치과 리뷰 작성
- 사용자는 리뷰를 작성할때 사진, 치과 이름, 질명 및 치료 항목, 치료 비용, 교정 시작/종료 날짜와 같은 정보를 추가할 수 있고 문단별로 사진/설명을 작성할 수 있어 보다 상세한 리뷰를 작성 할 수 있습니다.

<br/>
<img width="30%" src="https://user-images.githubusercontent.com/49143255/239927504-834c4deb-d8c0-43c0-8383-d2aaede23d9c.gif"/>
<br/>

### 4. 작성한 게시글 목록
- 사용자는 마이페이지를 통해 작성한 리뷰, 커뮤니티 게시글을 확인 할 수 있습니다.

<br/>
<img width="30%" src="https://user-images.githubusercontent.com/49143255/239927671-1e839eda-159e-49bb-9c09-45b96f79ac8c.gif"/>
<br/>

### 5. 키워드를 통한 치과 검색 
- 키워드를 통해서 원하는 치과를 검색할 수 있습니다. </br>
 검색된 치과의 상세 페이지로 이동하면 전국 치과 공공데이터로 부터 추출한 해당 치과의 설립 연도, 요일별 진료 시간, 상세한 위치, 진료 과목, 전문의 여부, 주차와 같은 상세한 정보를 확인 할 수 있습니다.

<br/>
<img width="30%" src="https://user-images.githubusercontent.com/49143255/239927718-84eaace8-a630-4cfc-b2a4-82f3bd6c3d86.gif"/>
<br/>




