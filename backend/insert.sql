INSERT INTO customers (id, name, email, password, address, phone)
VALUES 
  (1, 'John Doe', 'john@example.com', 'password123', '123 Main St', '555-1234'),
  (2, 'Jane Smith', 'jane@example.com', 'securepass', '456 Oak St', '555-5678'),
  (3, 'Bob Johnson', 'bob@example.com', 'pass123', '789 Elm St', '555-9876'),
  (4, 'Alice Brown', 'alice@example.com', 'p@ssw0rd', '987 Pine St', '555-4321');



INSERT INTO customers (id, name, email, password, address, phone)
VALUES 
  (5, 'omar', 'omarelsharkawy67@gmail.com', '1', '123 Main St', '555-1234')


ALTER TABLE cars
ADD COLUMN pricePerDay DECIMAL(10,2);

ALTER TABLE cars
ALTER COLUMN status SET DEFAULT 'active';