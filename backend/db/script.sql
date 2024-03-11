CREATE DATABASE likeme;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), titulo VARCHAR(25), img VARCHAR(1000),
descripcion VARCHAR(255), likes INT);

