# 2022년 1학기 캡스톤디자인 '자취9단'
본 프로젝트는 2022년 1학기 한남대학교 컴퓨터공학과 학술제 시연을 위해 제작되었습니다.

## 🎈 프로젝트 소개
자취9단은 배고픈 자취생들에게 요리 레시피를 제공하는 모바일 어플리케이션입니다.

## ⚙️ 기술 스택
### View
>- React (18.1.0)
>- Material UI (5.8.0)
>- axios (0.27.2)
>- quill (1.3.7)

### Framework
>- koa (2.13.4)

### Server
>- Heroku

### Database
>- MariaDB (10.6.7) with Amazon RDS

### Other
>- dotenv (16.0.1)
>- bcrypt (5.0.1)
>- jsonwebtoken (8.5.1)
>- sequelize (6.20.1)

## 🙆‍♂️ 역할 분배 
|역할|성명|업무|
|----|----|----|
|팀장|김민성|총괄, 서버개발, DB개발|
|팀원|윤&nbsp;&nbsp;&nbsp;제|GUI 개발|
|팀원|이진혁|서버, GUI 개발|
|팀원|정우석|기획, GUI 개발|

## ⌛ 프로젝트 진행기간
2022년 3월 7일 ~ 2022년 6월 12일 (3개월)

## ⚙️ 주요 기능
### 회원가입 | 로그인 | 로그아웃
>- bcrypt 라이브러리로 패스워드 암호화
>- JWT 라이브러리로 사용자에게 토큰 발급
>- 아이디 중복 시 회원가입 불가

### 메인화면
>- 레시피 리스트가 출력 (조회수, 난이도 출력)
>- filter 함수를 이용하여 레시피 검색기능을 구현 
>- 상단 로고 클릭 시 이 페이지로 이동

### 레시피 상세 페이지
>- 레시피 제목, 작성자, 작성일자, 본문으로 구성
>- 사용자가 업로드한 사진이 본문에 등록됨
>- 자신이 등록한 레시피의 수정, 삭제 가능 (모달 구현)

### 레시피 등록 페이지
>- quill 에디터로 사용자가 레시피를 작성할 수 있도록 구현
>- 사용자가 이미지를 첨부하면 서버가 아닌 Amazon S3 버킷으로 업로드 됨

## 📚 API Doc.
|기능|전송방식|URL|요청|응답|
|----|--------|---|----|----|
|회원가입|POST|api/auth/register|username, password|id, username, password(encoded)|
|로그인|POST|api/auth/login|username, password|id, username|
|로그인 여부 확인|GET|api/auth/check| |_id, username|
|로그아웃|POST|api/auth/logout| | |
|레시피 목록조회|GET|api/posts| |레시피 리스트 json|
|레시피 등록|POST|api/posts|title, body, level|레시피 json|
|레시피 상세 페이지|GET|api/posts/(id)| |레시피 json|
|레시피 삭제|DELETE|api/posts/(id)| | |
|레시피 수정|PATCH|api/posts/(id)|레시피json|레시피 json|