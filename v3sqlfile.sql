# for bookmydoctorV3
create database bookmydoctorv3db;
use bookmydoctorv3db;
show tables;



select * from Users;
select * from Utoken;
select * from appointments;
select * from schedules;
select * from Doctors;
select * from Dtoken;

describe schedules;
describe appointments;

UPDATE appointments
SET drating = 5;

DELETE FROM schedules WHERE sid = 4;


insert into schedules values(1,'2024-05-30',4,1,'ragu','8am-10am');