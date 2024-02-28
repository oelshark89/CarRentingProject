/**Import our dependencies */
const express = require("express");
const cors = require("cors");
const path = require("path");  // Include the 'path' module
const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 8000;

/**create an object from express */
const app = express();

/**tell what our app to use */

app.use(cors());
app.use(cors({
    origin: 'https://car-renting-project.vercel.app/'
  }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}..`));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'car_rental_system',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');

});

// Serve static files from the 'frontend' folder
// app.use(express.static(path.join(__dirname, "..", "frontendEmad")));

// // Define a route to serve your HTML file for the root path
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "frontendEmad", "index.html"));
// });


app.get("/getAllCars", (req, res) => {
  const getAllCars = "SELECT cars.*, offices.city FROM cars NATURAL JOIN offices";
  db.query(getAllCars, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.error(err);
      res.send({ error: 'Internal Server Error' });
    }
  });
});

app.get("/getAllCustomers", (req, res) => {
  const getAllCustomers = "SELECT * FROM customers";
  db.query(getAllCustomers, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.error(err);
      res.send({ error: 'Internal Server Error' });
    }
  });
});



app.get("/getAllOffices", (req, res) => {
  const getAllOffices = "SELECT * FROM offices";
  db.query(getAllOffices, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.error(err);
      res.send({ error: 'Internal Server Error' });
    }
  });
});
app.get("/getAllReservations", (req, res) => {
  const getAllReservations = "SELECT * FROM reservations ORDER BY startDate";
  db.query(getAllReservations, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.error(err);
      res.send({ error: 'Internal Server Error' });
    }
  });
});

app.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword, address, phone } = req.body;
  console.log('Received Data:', { name, email, password, confirmPassword, address, phone });
  if (!name || !email || !password || !confirmPassword || !address || !phone) {
    return res.send({ message: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.send({ message: 'Invalid email format' });
  }

  //TODO: validate phone number
  const phoneRegex = /^01\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.send({ message: 'Invalid phone number format' });
  }
  // Check if the email is already registered
  const checkEmailQuery = 'SELECT * FROM customers WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, existingCustomer) => {
    if (err) {
      console.error(err);
      return res.send({ error: 'Internal Server Error' });
    }

    if (existingCustomer.length > 0) {
      return res.send({ message: 'Email is already registered' });
    }
    if (confirmPassword !== password) {
      return res.send({ message: 'Password and Confirm Password must match' });
    }
    // Validate password complexity (at least 8 characters, includes a number and a special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.send({

        message: 'Password must be at least 8 characters long and include a number and a special character',
      });
    }

    const insertCustomerQuery =
      'INSERT INTO customers (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)';
    db.query(insertCustomerQuery, [name, email, password, address, phone], (insertErr, result) => {
      if (!insertErr) {
        res.send({ result, success: true, message: 'Customer successfully registered' });
      } else {
        console.error(insertErr);
        res.send({ error: 'Internal Server Error' });
      }
    });
  });
});


app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.send({ message: 'Email and password are required' });
  }
  if (email == "admin" && password == "Admin77!!") {
    res.send({ message: 'Welcome Admin!' })
  } else {

    db.query(
      "SELECT * FROM customers WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }

        if (result.length > 0) {
          res.send({ result, success: true, message: "You have successfully signed in" });
        } else {
          res.send({ message: "Wrong username/password combination" });
        }
      }
    )
  }
});



app.post('/admin/registerCar', (req, res) => {
  const model = req.body.model;
  const year = req.body.year;
  const plateId = req.body.plateId;
  const office_id = req.body.office_id;
  const mileage = req.body.mileage;
  const features = req.body.features;
  const pricePerDay = req.body.pricePerDay;
  const imageUrl = req.body.imageUrl;
  console.log('Model:', model);
  console.log('Year:', year);
  console.log('Plate ID:', plateId);
  console.log('Office ID:', office_id);
  console.log('Mileage:', mileage);
  console.log('Features:', features);
  console.log('Price Per Day:', pricePerDay);
  console.log('Image URL:', imageUrl);
  // Simple validation
  if (!model || !year || !plateId || !office_id || !mileage || !features || !pricePerDay || !imageUrl) {
    return res.send({ success: false, message: 'All fields are required' });
  }

  // Check if the plateId is already registered
  const checkPlateIdQuery = 'SELECT * FROM cars WHERE plateId = ?';
  db.query(checkPlateIdQuery, [plateId], (err, existingPlateId) => {
    if (err) {
      console.error(err);
      return res.send({ success: false, error: 'Internal Server Error' });
    }

    if (existingPlateId.length > 0) {
      return res.send({ success: false, message: 'plateId is already registered' });
    }

    //check if office is available
    const checkOfficeIdQuery = 'SELECT * FROM offices WHERE office_id = ? ';
    db.query(checkOfficeIdQuery, [office_id], (err, existingOfficeId) => {
      if (err) {
        console.error(err);
        return res.send({ success: false, error: 'Internal Server Error' });
      }

      if (!existingOfficeId.length) {
        return res.send({ success: false, message: 'Wrong office!' });
      }


      const insertCarQuery =
        'INSERT INTO cars (model, year, plateId, office_id, mileage, features, pricePerDay, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
      db.query(insertCarQuery, [model, year, plateId, office_id, mileage, features, pricePerDay, imageUrl], (insertErr, result) => {
        if (!insertErr) {
          res.send({ success: true, message: 'Car successfully registered' });
        } else {
          console.error(insertErr);
          res.send({ success: false, error: 'Internal Server Error' });
        }
      });
    });
  })
})


app.put('/admin/updateCarStatus', (req, res) => {
  const carId = req.body.carId;
  const newStatus = req.body.newStatus;

  // Simple validation to check if required fields are provided
  if (!carId || !newStatus) {
    return res.send({ success: false, message: 'carId and newStatus are required' });
  }

  const allowedStatusValues = ['active', 'rented', 'outOfService', 'maintenance'];

  if (!allowedStatusValues.includes(newStatus)) {
    return res.send({ success: false, message: 'Invalid newStatus value' });
  }

  const checkCurrentStatusQuery = 'SELECT status FROM cars WHERE id = ?';

  db.query(checkCurrentStatusQuery, [carId], (statusErr, statusResult) => {
    if (statusErr) {
      console.error(statusErr);
      return res.send({ success: false, error: 'Internal Server Error' });
    }

    if (statusResult.length > 0) {
      const currentStatus = statusResult[0].status;

      // Compare the current status with the new status
      if (currentStatus === newStatus) {
        return res.send({ success: false, message: 'Car is already in the requested status' });
      }

      // If not the same, proceed with the update
      const updateCarStatusQuery = 'UPDATE cars SET status = ? WHERE id = ?';

      db.query(updateCarStatusQuery, [newStatus, carId], (err, result) => {
        if (!err) {
          if (result.affectedRows > 0) {
            res.send({ success: true, message: 'Car status successfully updated' });
          } else {
            res.send({ success: false, message: 'Car not found' });
          }
        } else {
          console.error(err);
          res.send({ success: false, error: 'Internal Server Error' });
        }
      });
    } else {
      res.send({ success: false, message: 'Car not found' });
    }
  });
});

app.put('/admin/updateReservationStatus', (req, res) => {
  const customerId = req.body.customerId;
  const carId = req.body.carId;
  const newStatus = req.body.newStatus;

  // Simple validation to check if required fields are provided
  if (!carId || !newStatus || !customerId) {
    return res.send({ success: false, message: 'carId, customerId and newStatus are required' });
  }

  const checkCurrentStatusQuery = 'SELECT status FROM reservations WHERE customerId = ? AND carId = ?';

  db.query(checkCurrentStatusQuery, [customerId, carId], (statusErr, statusResult) => {
    if (statusErr) {
      console.error(statusErr);
      return res.send({ success: false, error: 'Internal Server Error' });
    }

    if (statusResult.length > 0) {
      const currentStatus = statusResult[0].status;

      // Compare the current status with the new status
      if (currentStatus === newStatus) {
        return res.send({ success: false, message: 'Reservation is already in the requested status' });
      }

      // If not the same, proceed with the update
      const updateCarStatusQuery = 'UPDATE reservations SET status = ? WHERE (customerId = ? AND carId = ?)';

      db.query(updateCarStatusQuery, [newStatus, customerId, carId], (err, result) => {
        if (!err) {
          if (result.affectedRows > 0) {
            res.send({ success: true, message: 'Reservation status successfully updated' });
          } else {
            res.send({ success: false, message: 'Reservation not found' });
          }
        } else {
          console.error(err);
          res.send({ success: false, error: 'Internal Server Error' });
        }
      });
    } else {
      res.send({ success: false, message: 'Reservation not found' });
    }
  });
});



//System should be able to make advanced search which is searching by any of the car information, customer information or reservation day and get all information about the car, customer and reservation.
app.post('/admin/Cars/searchCar', (req, res) => {
  const searchCar = req.body.searchValueBackend;
  const searchCarQuery = 'SELECT cars.*, offices.city FROM cars NATURAL JOIN offices WHERE CONCAT_WS(id, model, year, plateId, status, office_id, mileage, features, pricePerDay, city) LIKE CONCAT("%", ?, "%")';

  db.query(
    searchCarQuery,
    [searchCar],
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ success: false, message: 'No Car matches!' });
        }
      } else {
        console.error(err);
        res.send({ success: false, error: 'Internal Server Error' });
      }
    }
  );
});


app.post('/admin/Cars/searchCustomer', (req, res) => {

  const searchCustomer = req.body.searchValueBackend;
  console.log("search value backend: " + searchCustomer);
  const searchCustomerQuery = 'SELECT * FROM customers WHERE CONCAT_WS(id, name, email, password, address, phone) LIKE CONCAT("%", ?, "%")';
  db.query(
    searchCustomerQuery,
    searchCustomer,
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.send(result)
        }
        else {
          res.send({ success: true, message: 'No Customer matches!' });
        }
      } else {
        console.error(err);
        res.send({ success: false, error: 'Internal Server Error' });
      }
    }
  )
})
app.post('/admin/Cars/searchOffices', (req, res) => {
  const searchValue = req.body.searchValueBackend;
  const searchOfficesQuery = 'SELECT * FROM offices WHERE CONCAT_WS(office_id, name, city, address, phone) LIKE CONCAT("%", ?, "%")';

  db.query(searchOfficesQuery, searchValue, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ success: true, message: 'No offices match the search criteria!' });
      }
    } else {
      console.error(err);
      res.send({ success: false, error: 'Internal Server Error' });
    }
  });
});


app.post('/admin/Cars/searchReservation', (req, res) => {

  const searchReservation = req.body.searchValueBackend;
  const searchReservationQuery = 'SELECT * FROM reservations WHERE CONCAT_WS(customerId, carId, startDate, endDate, totalPrice, status) LIKE CONCAT("%", ?, "%")';
  db.query(
    searchReservationQuery,
    searchReservation,
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.send(result);
        }
        else {
          res.send({ success: true, message: 'No Reservation matches!' });
        }
      } else {
        console.error(err);
        res.send({ success: false, error: 'Internal Server Error' });
      }
    }
  )
})



app.post('/reserveCar', (req, res) => {
  const customerId = req.body.customerId;
  const carId = req.body.carId;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  console.log('customerId:', customerId);
  console.log('carId:', carId);
  console.log('startDate:', startDate);
  console.log('endDate:', endDate);

  if (!customerId || !carId || !startDate || !endDate) {
    return res.send({ success: false, message: 'All fields are required' });
  }
  if (startDate > endDate) {
    return res.send({ success: false, message: 'Invalid Dates!' })
  }

  const checkCustomerQuery = 'SELECT * FROM customers WHERE id = ?';
  db.query(
    checkCustomerQuery,
    [customerId],
    (customerErr, customerResult) => {
      if (customerErr) {
        console.error(customerErr);
        return res.send({ success: false, error: 'Internal Server Error' });
      }

      if (customerResult.length === 0) {
        return res.send({ success: false, message: 'Customer not found' });
      }

      const getCarInfo = 'SELECT pricePerDay, status FROM cars WHERE id = ?';
      db.query(
        getCarInfo,
        [carId],
        (carInfoErr, carInfoResult) => {
          if (!carInfoErr) {
            if (carInfoResult.length > 0) {
              const pricePerDay = carInfoResult[0].pricePerDay;
              const status = carInfoResult[0].status;

              if (status !== 'active') {
                return res.send({ success: false, message: 'Car is not available for rent!' });
              }

              const overlappingReservationsQuery = 'SELECT * FROM reservations WHERE carId = ? AND startDate <= ? AND endDate >= ?';
              db.query(
                overlappingReservationsQuery,
                [carId, endDate, startDate],
                (overlapErr, overlapResult) => {
                  if (!overlapErr) {
                    if (overlapResult.length > 0) {
                      return res.send({ success: false, message: 'Car is already reserved for the selected date range' });
                    }

                    const totalPrice = (endDate - startDate) / (1000 * 60 * 60 * 24) * pricePerDay;

                    const reservationQuery = 'INSERT INTO reservations(customerId, carId, startDate, endDate, totalPrice) VALUES (?,?,?,?,?)';
                    db.query(
                      reservationQuery,
                      [customerId, carId, startDate, endDate, totalPrice],
                      (reservationErr, reservationResult) => {
                        if (!reservationErr) {
                          res.json({ success: true, message: 'Congratulations! Reservation Complete!' });
                        } else {
                          console.error(reservationErr);
                          res.send({ success: false, error: 'Internal Server Error' });
                        }
                      }
                    );
                  } else {
                    console.error(overlapErr);
                    res.send({ success: false, error: 'Internal Server Error' });
                  }
                }
              );

            } else {
              res.send({ success: false, error: 'Car not found!' });
            }
          } else {
            console.error(carInfoErr);
            res.send({ success: false, error: 'Internal Server Error' });
          }
        }
      );
    }
  );
});
//TODO: seperate into functions


app.put('/admin/updateReservationStatus', (req, res) => {
  const reservationId = req.body.reservationId;
  const newStatus = req.body.newStatus;

  // Simple validation to check if required fields are provided
  if (!reservationId || !newStatus) {
    return res.send({ success: false, message: 'reservationId and newStatus are required' });
  }

  const allowedStatusValues = ['reserved', 'picked up', 'returned'];

  if (!allowedStatusValues.includes(newStatus)) {
    return res.send({ success: false, message: 'Invalid newStatus value' });
  }

  const updateReservationStatusQuery = 'UPDATE reservations SET status = ? WHERE reservationId = ?';

  db.query(
    updateReservationStatusQuery,
    [newStatus, reservationId],
    (err, result) => {
      if (!err) {
        if (result.affectedRows > 0) {
          res.send({ success: true, message: 'Reservation status successfully updated' });
        } else {
          res.send({ success: false, message: 'Reservation not found' });
        }
      } else {
        console.error(err);
        res.send({ success: false, error: 'Internal Server Error' });
      }
    }
  );
});


//report #5
app.post('/admin/reportdailyPayments', (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;     // Get the end date from the query parameters

  // Simple validation to check if required fields are provided
  if (!startDate || !endDate) {
    return res.send({ success: false, message: 'startDate and endDate are required' });
  }

  const dailyPaymentsQuery = `
    SELECT
      DATE(reservations.startDate) AS payment_date,
      SUM(reservations.totalPrice) AS total_payment
    FROM reservations
    WHERE reservations.startDate >= ? AND reservations.endDate <= ?
    GROUP BY payment_date;
  `;

  db.query(dailyPaymentsQuery, [startDate, endDate], (err, results) => {
    if (!err) {
      res.json(results);
    } else {
      console.error(err);
      res.send({ success: false, error: 'Internal Server Error' });
    }
  });
});


//report #4
app.post('/admin/reportCustomerReservations', (req, res) => {
  const customerId = req.body.customerId; // Get the customer ID from the query parameters

  // Simple validation to check if the customer ID is provided
  if (!customerId) {
    return res.send({ success: false, message: 'customerId is required' });
  }

  //TODO: check if customer id is available

  const customerReservationsQuery = `
    SELECT
      customers.name AS customer_name,
      customers.email AS customer_email,
      cars.model AS car_model,
      cars.plateId AS car_plate_id,
      reservations.*
    FROM
      reservations
      JOIN customers ON reservations.customerId = customers.id
      JOIN cars ON reservations.carId = cars.id
    WHERE reservations.customerId = ?;
  `;

  db.query(customerReservationsQuery, [customerId], (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      console.error(err);
      res.send({ success: false, error: 'Internal Server Error' });
    }
  });
});



//report #3
app.post('/admin/reportCarsStatusOnDay', (req, res) => {
  const specificDay = req.body.specificDay;

  if (!specificDay) {
    return res.send({ success: false, message: 'specificDay is required' });
  }

  const carsStatusOnDayQuery = `
    SELECT
      cars.model AS car_model,
      cars.plateId AS car_plate_id,
      cars.status AS car_status
    FROM
      cars
      LEFT JOIN reservations ON cars.id = reservations.carId
    WHERE
      (reservations.startDate IS NULL OR ?  BETWEEN reservations.startDate AND reservations.endDate);
  `;

  db.query(carsStatusOnDayQuery, [specificDay], (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      console.error(err);
      res.send({ success: false, error: 'Internal Server Error' });
    }
  });
});



//report #1
//gets car and customer info as well
app.post('/admin/reportReservationsWithinPeriod', (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;


  if (!startDate || !endDate) {
    return res.send({ success: false, message: 'startDate and endDate are required' });
  }

  const reservationsWithinPeriodQuery = `
    SELECT
      reservations.*,
      customers.name AS customer_name,
      customers.email AS customer_email,
      cars.model AS car_model,
      cars.plateId AS car_plate_id
    FROM
      reservations
      JOIN customers ON reservations.customerId = customers.id
      JOIN cars ON reservations.carId = cars.id
    WHERE
      reservations.startDate >= ? AND reservations.endDate <= ?;
  `;

  db.query(reservationsWithinPeriodQuery, [startDate, endDate], (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      console.error(err);
      res.send({ success: false, error: 'Internal Server Error' });
    }
  });
});



//report #2
app.post('/admin/reportCarReservationsWithinPeriod', (req, res) => {
  const carId = req.body.carId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;


  if (!carId || !startDate || !endDate) {
    return res.send({ success: false, message: 'carId, startDate, and endDate are required' });
  }

  const carReservationsWithinPeriodQuery = `
    SELECT
      reservations.*,
      cars.model AS car_model,
      cars.plateId AS car_plate_id
    FROM
      reservations
      JOIN cars ON reservations.carId = cars.id
    WHERE
      reservations.carId = ? AND
      reservations.startDate >= ? AND reservations.endDate <= ?;
  `;

  db.query(carReservationsWithinPeriodQuery, [carId, startDate, endDate], (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      console.error(err);
      res.send({ success: false, error: 'Internal Server Error' });
    }
  });
});
