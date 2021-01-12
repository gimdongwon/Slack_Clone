# Back-end

slack 백엔드 입니다.

사용 패키지

1. typescript
2. typeorm : Ts용 ORG이다. PostgreSQL 데이터베이스를 지원한다. Object-relatinal mapping으로 객체와 관계와의 설정을 의미한다.
3. nodemon : Nodejs에 웹 애플리케이션을 개발할 때, 파일에 변경사항이 발생했을 떄, 저절로 애플리케이션이 재실행되도록 도와주는 패키지이다. (Hot-reloading과 유사한듯)
4. pg : nodejs에서 postgreSQL을 사용하기 위한 패키지
5. graphql-yoga : GraphQL 기반의 서버를 만들기 위해 쉽게 제작한 프로젝트로 cra랑 비슷함.
6. ts-node : tsc라는 도구를 이용해 메모리상에서 ts를 transpile 하여 바로 실행할 수 있게 해준다.
7. babel-runtime : 실제 실행 환경에서 헬퍼함수들이 참조할 수 있는 폴리필을 내장한 모듈로써 동작.
8. tslint
9. pg : postgresql DB를 node에서 사용하기 위해서 추가로 설치.

## 역할

- nodemon.json : ext는 확장자를 의미함. 그 속성값의 확장자 코드가 수정될 경우 프로젝트 새로고침함.
- tsconfig.json : ts가 js로 transpiling 할 때 고려되어지는 설정 정보들.
- tslint.json : lint로 코드 표준 정적 분석 후 변경해주는 규칙 정리
- .babelrc : babel 설정

- Channel.ts, Message.ts, Channel.graphql, Message.graphql는 전부 데이터의 형태에 대한 정의이다. 함수를 위한 코드는 grpahql만 만들어 준다. ts 파일은 'graphql-to-typescript'가 자동으로 생성해준다.

- node script의 특성 중에 하나는 앞의 'pre~'가 붙은 스크립트들은 같은 이름을 가진 스크립트보다 먼저 실행시킬 수 있다. ex) dev보다 predev먼저, types보다 pretypes먼저 실행된다.
- pretypes가 graphql를 위한 타입들이 shema.graphql 파일에 합쳐지고 types를 통해 schema.graphql에 정의된 타입들을 typescript를 위한 타입들로 변화한다. 그리고 graphql.d.ts피일에 저장된다.