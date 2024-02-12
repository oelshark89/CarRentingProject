CREATE DATABASE car_rental_system;

USE car_rental_system;

CREATE TABLE Cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  plateId VARCHAR(10) UNIQUE NOT NULL,
  status ENUM('active', 'outOfService', 'rented', 'maintenance') NOT NULL,
  office_id int NOT NULL,
  mileage INT DEFAULT 0,
  features TEXT
);
CREATE TABLE Customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  driversLicense VARCHAR(20)
);
CREATE TABLE Reservations (
  customerId INT NOT NULL,
  carId INT NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  totalPrice DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'canceled') NOT NULL
  );

CREATE TABLE Offices (
  office_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL
);
CREATE TABLE Admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);
Alter table Cars ADD FOREIGN KEY(office_id) REFERENCES offices(office_id);
Alter table Reservations add FOREIGN KEY (customerId) REFERENCES Customers(id);
Alter table Reservations add FOREIGN KEY (carId) REFERENCES Cars(id);
INSERT INTO Offices (name, city, address, phone) VALUES
('Downtown Office', 'Cityville', '123 Main Street', '555-1234'),
('Suburb Office', 'Suburbia', '456 Oak Avenue', '555-5678'),
('Airport Office', 'Airport City', '789 Skyway Blvd', '555-9012');
INSERT INTO Cars (model, year, plateId, status, office_id, mileage, features) VALUES
('Toyota Camry', 2022, 'ABC123', 'active', 1, 5000, 'GPS,Bluetooth'),
('Honda Accord', 2021, 'XYZ789', 'active', 2, 6000, 'Backup Camera,Leather Seats'),
('Ford Mustang', 2023, 'DEF456', 'active', 1, 3000, 'Convertible,Navigation System'),
('Chevrolet Cruze', 2020, 'GHI789', 'active', 3, 8000, 'Fuel Efficient,Apple CarPlay');

