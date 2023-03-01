# React BoilerPlate

* typescript v4.9.5
* vite v4.1.4
    - vite-tsconfig-paths 를 이용한 절대 경로 설정
* React v18.2.0
    - + react-router-dom
    - emotion
        * react
        * styled
* prettier
* eslint

### scripts

 * dev: 개발 서버를 돌릴 수 있음
 * build: 배포용 빌드 파일을 만듬
 * preview: 배포용 빌드 파일을 미리 봄

### settings

* emotion 설정
    - `src/styles/theme` 에서 테마 코드 설정 (`src/dtypes/emotion.d.ts`)
        * 테마 설정을 하지 않을 것이라면 코드 삭제도 좋음
        * Theme Type과 코드 설정 바람 (디자인 색상 설정 필요)
    - `src/styles/GlobalStyle` 에서 initial css 설정
* `index.html` 파일에서 title, favicon 등의 설정
* `public/manifest.json` 파일에서 title, description, logo 등의 설정
* `package.json` 파일에서 title, description 등의 설정

### publics

`/public` 폴더 아래에 static assets를 넣고 index.html에서 제공한다.