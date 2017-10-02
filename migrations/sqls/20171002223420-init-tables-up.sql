
CREATE TABLE IF NOT EXISTS member(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) UNIQUE,
  role VARCHAR(50),
  status VARCHAR(50),
  date_joined TIMESTAMP(6) WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS genre(
  id SERIAL PRIMARY KEY,
  type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS director(
  id SERIAL PRIMARY KEY,
  fname VARCHAR(255),
  lname VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS content(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  director_id INTEGER REFERENCES director(id),
  genre_id INTEGER REFERENCES genre(id),
  image_url VARCHAR(500),
  release_year VARCHAR(500),
  TRT INTEGER,
  rating INTEGER,
  keyword VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS rating(
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES member(id),
  rating_number INTEGER,
  review TEXT
);

CREATE TABLE IF NOT EXISTS liked_content(
  member_id INTEGER REFERENCES member(id),
  content_id INTEGER REFERENCES content(id)
);

CREATE TABLE IF NOT EXISTS role(
  member_id INTEGER REFERENCES member(id),
  admin VARCHAR(10) NOT NULL,
  standard VARCHAR(10) NOT NULL,
  guest VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" TIMESTAMP(6) NOT NULL
)

WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
