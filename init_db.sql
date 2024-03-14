CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    position VARCHAR(50),
    startdate DATE
    );