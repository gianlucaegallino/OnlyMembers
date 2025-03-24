CREATE DATABASE onlymembers;

CREATE TABLE users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name varchar(128),
surname varchar(128),
username varchar(128),
password varchar(256),
memberstatus boolean
);


CREATE TABLE posts (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title varchar(64),
timestamp timestamptz,
content varchar(512),
userid INTEGER REFERENCES users (id)
);