/*
MySQL commands log book for building group46 database
Building Draft Database Start Here
*/
We can make a backup of our database by running the following:
mysqldump --host=127.0.0.1 --databases group46ver2 > group46ver2_database.sql

To load the database:
mysql --host=127.0.0.1 < group46_ver2_database.sql


SHOW DATABASE group46;
CREATE DATABASE group46;
USE group46;

CREATE TABLE user_profile(
   user_id INT AUTO_INCREMENT PRIMARY KEY,
   firstname VARCHAR(255) NOT NULL,
   lastname VARCHAR(255) NOT NULL,
   username VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   contact_number VARCHAR(30),
   email_address VARCHAR(255)
);

CREATE TABLE admin_profile(
   admin_id INT AUTO_INCREMENT PRIMARY KEY,
   firstname VARCHAR(255) NOT NULL,
   lastname VARCHAR(255) NOT NULL,
   username VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   contact_number VARCHAR(30),
   email_address VARCHAR(255)
);

CREATE TABLE manager_profile(
   manager_id INT AUTO_INCREMENT PRIMARY KEY,
   firstname VARCHAR(255) NOT NULL,
   lastname VARCHAR(255) NOT NULL,
   username VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   contact_number VARCHAR(30),
   email_address VARCHAR(255),
   venue_id INT,
       FOREIGN KEY (venue_id)
       REFERENCES venue(venue_id)
        ON UPDATE SET NULL
        ON DELETE SET NULL
);

CREATE TABLE venue (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    venue_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    capacity INT
);

CREATE TABLE venue_visits (
    visit_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    visit_date datetime NOT NULL,
    venue_id INT,
    FOREIGN KEY(user_id)
       REFERENCES user_profile(user_id)
       ON UPDATE SET NULL
       ON DELETE SET NULL,
    FOREIGN KEY(venue_id)
       REFERENCES venue(venue_id)
       ON UPDATE SET NULL
       ON DELETE SET NULL
);

SHOW TABLES;

DESC user_profile;
DESC admin_profile;
DESC manager_profile;
DESC venue;
DESC venue_visits;
DESC hotspot;

SELECT * FROM user_profile;
SELECT * FROM admin_profile;
SELECT * FROM manager_profile;
SELECT * FROM venue;
SELECT * FROM venue_visits;
SELECT * FROM hotspot;

INSERT INTO user_profile (firstname, lastname, username, password, address, contact_number, email_address)
VALUES ('Jay', 'Park', 'Jay', '123', 'University of Adelaide', '0412345678', 'jayjay@gmail.com'),
('Bob', 'Taylor', 'Bob', 'bob123', '55 Grote Street Adelaide', '0400123456', 'yolo123@gmail.com'),
('Ryuko', 'Moshi', 'Ryu', 'ninja', '1 Currie Street Adelaide', '0430123456', 'ninjaryu@gmail.com');

INSERT INTO admin_profile (firstname, lastname, username, password, address, contact_number, email_address)
VALUES ('Samuel', 'Jackson', 'Sam', 'sam123', '45 Green Hill Road Adelaide', '0440123456', 'samsam@gmail.com'),
('Joe', 'McDonald', 'Joe', 'joe123', '345 Maroon Street Adelaide', '0441123456', 'joejoe@gmail.com'),
('Timothy', 'Carlos', 'Tim', 'tim123', '15 Rose Street Adelaide', '0442123456', 'timtim@gmail.com');

INSERT INTO manager_profile (firstname, lastname, username, password, address, contact_number, email_address)
VALUES ('Rinnei', 'Johnson', 'Rin', 'rin123', '72 Kings Road Adelaide', '0444123456', 'rinrin@gmail.com'),
('Lynnerux', 'Kolaf', 'Lyn', 'Lyn123', '345 Maroon Street Adelaide', '0445123456', 'lynlyn@gmail.com'),
('Beer', 'Cheer', 'Bee', 'Bee123', '15 Rose Street Adelaide', '0446123456', 'beebee@gmail.com');

INSERT INTO venue (venue_name, address, capacity)
VALUES ("Rin's Mini Shop", '31 Kings Road Adelaide', 15),
("Ninja Accessory Adelaide", '77 Midnight Road Adelaide', 20),
("Honey Honey", '82 Rose Street Adelaide', 30);

UPDATE manager_profile
SET
    venue_id = 1
WHERE
    username = 'Rin';

UPDATE manager_profile
SET
    venue_id = 2
WHERE
    username = 'Lyn';

UPDATE manager_profile
SET
    venue_id = 3
WHERE
    username = 'Bee';

INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (1, NOW(), 1);
INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (2, NOW(), 1);
INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (3, NOW(), 1);

INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (2, NOW(), 2);
INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (3, NOW(), 1);

INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (1, NOW(), 3);
INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (3, NOW(), 3);



INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (2, '2021-06-10 15:30:30', 2);
INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (3, '2021-06-10 10:34:12', 1);

INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (1, '2021-06-10 16:29:21', 3);
INSERT INTO venue_visits (user_id, visit_date, venue_id)
VALUES (3, '2021-06-10 14:00:00', 3);

SELECT
    *
FROM
    venue_visits
WHERE
    DATE(visit_date) = '2021-06-11';

SELECT
    *
FROM
    venue_visits
WHERE
    DATE(visit_date) = '2021-06-10';

CREATE TABLE hotspot (
    hotspot_id INT AUTO_INCREMENT PRIMARY KEY,
    infected_people INT,
    venue_id INT,
    FOREIGN KEY(venue_id)
        REFERENCES venue(venue_id)
        ON UPDATE SET NULL
        ON DELETE SET NULL
);

INSERT INTO hotspot (infected_people, venue_id)
VALUES (5, 1), (2, 2);

INSERT INTO hotspot (infected_people, venue_id)
VALUES (13, 3);

SELECT * FROM hotspot
ORDER BY infected_people DESC;

/*
Building Draft Database Ends Here
*/

SELECT firstname, lastname, username, address, contact_number, email_address FROM user_profile WHERE username='' LIMIT 1;

UPDATE user_profile SET password = 'req.body.editPassword' WHERE username = 'req.session.user.logInId';

UPDATE user_profile SET address = 'req.body.editAddress' WHERE username = 'req.session.user.logInId';

UPDATE user_profile SET contact_number = 'req.body.editContactNumber' WHERE username = 'req.session.user.logInId';

UPDATE user_profile SET email_address = 'req.body.editEmailAddress' WHERE username = 'req.session.user.logInId';