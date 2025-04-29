-- DB作成
CREATE DATABASE echo_go_react_rest_api;

-- 作成したDBへ切り替え
\c echo_go_react_rest_api

-- スキーマ作成
CREATE SCHEMA IF NOT EXISTS public;

-- 権限追加
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres_user;
