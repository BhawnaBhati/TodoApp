CREATE TABLE if not exists users (
	id serial NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	username varchar NOT NULL,
	password varchar NULL,
	is_logged_in boolean default false,
	PRIMARY KEY (id),
	UNIQUE(username)
);

CREATE TABLE if not exists tasks (
	id serial NOT NULL,
	created_at timestamp not null default now(),
	user_id integer,
	"name" varchar NOT NULL,
	completed boolean default false,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);