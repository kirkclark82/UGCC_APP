const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ugcc_app',
  port: process.env.DB_PORT || 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, studentUSI, password } = req.body;

    // Validate required fields
    if (!fullName || !email || !studentUSI || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM ugcc_registration WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error' 
        });
      }

      if (results.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already registered' 
        });
      }

      // Check if USI already exists
      const checkUSIQuery = 'SELECT * FROM ugcc_registration WHERE usi = ?';
      db.query(checkUSIQuery, [studentUSI], async (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Database error' 
          });
        }

        if (results.length > 0) {
          return res.status(400).json({ 
            success: false, 
            message: 'Student USI already registered' 
          });
        }

        try {
          // Hash the password
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          // Insert new registration
          const insertQuery = 'INSERT INTO ugcc_registration (fullname, email, usi, password) VALUES (?, ?, ?, ?)';
          db.query(insertQuery, [fullName, email, studentUSI, hashedPassword], (err, result) => {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ 
                success: false, 
                message: 'Failed to register user' 
              });
            }

            res.status(201).json({ 
              success: true, 
              message: 'Registration successful!',
              userId: result.insertId
            });
          });
        } catch (hashError) {
          console.error('Password hashing error:', hashError);
          res.status(500).json({ 
            success: false, 
            message: 'Server error' 
          });
        }
      });
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const findUserQuery = 'SELECT * FROM ugcc_registration WHERE email = ?';
    db.query(findUserQuery, [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error' 
        });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }

      const user = results[0];

      try {
        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ 
            success: false, 
            message: 'Invalid email or password' 
          });
        }

        // Login successful
        res.status(200).json({ 
          success: true, 
          message: 'Login successful!',
          user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            usi: user.usi,
            address: user.address,
            department: user.department,
            year: user.year,
            telephone: user.telephone,
            emergency_contact: user.emergency_contact,
            interest: user.interest,
            areas_of_interest: user.areas_of_interest,
            level_of_experience: user.level_of_experience
          }
        });

      } catch (compareError) {
        console.error('Password comparison error:', compareError);
        res.status(500).json({ 
          success: false, 
          message: 'Server error' 
        });
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Update user account information
app.put('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { 
      fullname, 
      email, 
      usi, 
      address, 
      department, 
      year, 
      telephone, 
      emergency_contact, 
      interest, 
      areas_of_interest, 
      level_of_experience 
    } = req.body;

    // Ensure areas_of_interest is a string (comma-separated if it's an array)
    const areasOfInterestString = Array.isArray(areas_of_interest) 
      ? areas_of_interest.join(',') 
      : areas_of_interest;

    // Check if email already exists (excluding current user)
    const checkEmailQuery = 'SELECT * FROM ugcc_registration WHERE email = ? AND id != ?';
    db.query(checkEmailQuery, [email, userId], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error' 
        });
      }

      if (results.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already in use by another account' 
        });
      }

      // Check if USI already exists (excluding current user)
      const checkUSIQuery = 'SELECT * FROM ugcc_registration WHERE usi = ? AND id != ?';
      db.query(checkUSIQuery, [usi, userId], async (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Database error' 
          });
        }

        if (results.length > 0) {
          return res.status(400).json({ 
            success: false, 
            message: 'Student USI already in use by another account' 
          });
        }

        // Update user information
        const updateQuery = `
          UPDATE ugcc_registration 
          SET fullname = ?, email = ?, usi = ?, address = ?, department = ?, 
              year = ?, telephone = ?, emergency_contact = ?, interest = ?, 
              areas_of_interest = ?, level_of_experience = ?
          WHERE id = ?
        `;
        
        db.query(updateQuery, [
          fullname, email, usi, address, department, year, 
          telephone, emergency_contact, interest, areasOfInterestString, 
          level_of_experience, userId
        ], (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
              success: false, 
              message: 'Failed to update account information' 
            });
          }

          res.status(200).json({ 
            success: true, 
            message: 'Account information updated successfully!'
          });
        });
      });
    });

  } catch (error) {
    console.error('Update account error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Get all registrations (for admin purposes)
app.get('/api/registrations', (req, res) => {
  const query = 'SELECT id, fullname, email, usi, created_at FROM ugcc_registration ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error' 
      });
    }

    res.json({ 
      success: true, 
      data: results 
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
