# Epliogue_FE
독서 기록 및 커뮤니티 플랫폼 "에필로그" 원격 저장소입니다.


*배포하기 전 웹사이트 보기*
1) Nodejs, VSCode, git 설치
2) 새 폴더를 생성 후 VSCode로 열기
3) 터미널로 실행하기 위한 파일 설치 (terminal: ctrl+shift+`)
   -npm create vite@latest
   -project name: .
   -framework: react
   -variant: ts + swc
   -npm install
   -npm install react-router-dom
   -npm install -D tailwindcss@3 postcss autoprefixer
   -npm install -D daisyui@latest
5) Github에서 소스코드를 local로 가져오기 (2가지 방법 중 1개 선택)
   A) 추천
   -public + src 폴더 먼저 삭제
   -github 에서 직접 다운로드 후 압축해제
   -Alzip 안에 들어있는 파일 전부 선택 후 폴더에 덮어쓰기
   -npm install 한번 더 해준다
   
   B) untracked files로 인한 충돌
   git command 로 가져오기
6) localhost 로 실행
   -terminal: npm run dev
   -localhost link 생성 -> ctrl+click