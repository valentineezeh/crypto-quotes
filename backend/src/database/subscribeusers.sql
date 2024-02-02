CREATE TABLE SubscribeUsers (
    id SERIAL PRIMARY KEY,
    cryptoID FLOAT NOT NULL,
    email VARCHAR(100)  NOT NULL
);