const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

// Request validation middleware
const validateRegistration = (req, res, next) => {
  try {
    const { fullName, email, studentUSI, password } = req.body;
    
    if (!fullName || !email || !studentUSI || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // USI validation (alphanumeric, 6-10 characters)
    const usiRegex = /^[a-zA-Z0-9]{6,10}$/;
    if (!usiRegex.test(studentUSI)) {
      return res.status(400).json({
        success: false,
        message: 'Student USI must be 6-10 alphanumeric characters'
      });
    }

    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid input data'
    });
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    next();
  } catch (error) {
    console.error('Login validation error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid login data'
    });
  }
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limit request size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-memory storage for demonstration
let users = [];
let nextId = 1;

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
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Check if USI already exists
    const existingUSI = users.find(user => user.usi === studentUSI);
    if (existingUSI) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student USI already registered' 
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      id: nextId++,
      fullname: fullName,
      email: email,
      usi: studentUSI,
      password: hashedPassword,
      address: '',
      department: '',
      year: '',
      telephone: '',
      emergency_contact: '',
      interest: '',
      areas_of_interest: '',
      level_of_experience: '',
      created_at: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({ 
      success: true, 
      message: 'Registration successful!',
      userId: newUser.id
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
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

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
    const userId = parseInt(req.params.id);
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

    // Find user
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if email already exists (excluding current user)
    const existingEmail = users.find(u => u.email === email && u.id !== userId);
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already in use by another account' 
      });
    }

    // Check if USI already exists (excluding current user)
    const existingUSI = users.find(u => u.usi === usi && u.id !== userId);
    if (existingUSI) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student USI already in use by another account' 
      });
    }

    // Update user information
    users[userIndex] = {
      ...users[userIndex],
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
    };

    res.status(200).json({ 
      success: true, 
      message: 'Account information updated successfully!'
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
  const registrations = users.map(user => ({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    usi: user.usi,
    created_at: user.created_at
  }));

  res.json({ 
    success: true, 
    data: registrations 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using in-memory database for demonstration');
});
