CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Role VARCHAR(50) DEFAULT 'user'
);

INSERT INTO Users (Name, Email, Role) 
VALUES ('Martina Plantijn', 'martina@decodelabs.tech', 'admin');