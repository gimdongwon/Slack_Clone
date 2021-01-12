import { ConnectionOptions, Connection, createConnection } from "typeorm";
// ConnectionOptions : typeORM에서 DB 환경 정보를 받기 위한 객체타입
// Connection : typeORM에서 제공하는 연결 객체 타입
// createConnection : 연결을 만드는 함수

import dotenv from "dotenv";
dotenv.config();

const ConnectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "slack",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  // typeORM은 테이블의 생성을 도와주는데 그 테이블의 스키마 등을 명세하는 객체.
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

const connection: Promise<Connection> = createConnection(ConnectionOptions);
// 위에서 정의한 connections와 연결 객체를 만드는 createConnection()함수를 활용해서 db객체 만들고 반환 이 connection Type은 Promise<Connection>인데 비동기로 받겠다는 의미

export default connection;
