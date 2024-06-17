const db = require('../config/Connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');





const Signup = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if email already exists in the database
        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailQuery, [email], (error, results) => {
            if (error) {
                console.error('Error checking email existence: ' + error.stack);
                return res.status(500).json({ error: 'Failed to check email existence' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash the password and insert the user
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to hash password' });
                }

                const insertUserQuery = "INSERT INTO users(`email`, `password`) VALUES (?)";
                const values = [email, hashedPassword];

                db.query(insertUserQuery, [values], (error, data) => {
                    if (error) {
                        console.error('Error inserting user into the database: ' + error.stack);
                        return res.status(500).json({ error: 'Failed to insert user' });
                    }
                    return res.status(201).json({ message: 'User registered successfully' });
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}


const Login =(req,res)=>{
    

    const { email, password } = req.body;


    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to authenticate' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const payload = {
                userId: results[0].id,
                email: results[0].email
            };
            const token = jwt.sign(payload, 'vvvvvvvvvvvvvvvv', { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token: token });
        });
    });
}



const Logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.send('Logged out');
        }
    });
}



const getAll=(req,res)=> {
    const q = "SELECT * FROM users";
    db.query(q, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        return res.status(200).json(results);
    });
}


const getById = (req,res)=>{
    const userId = req.params.id;
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch user' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(results[0]);
    });
}

const getByEmail = (req,res)=>{
    const userEmail = req.params.email;
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [userEmail], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch user' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(results[0]);
    });
}


const deleteById =(req,res)=> {
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id = ?";
    db.query(q, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    });
}


const editUserById =(req,res)=>{
    const userId = req.params.id;
    const { firstname, lastname, username, email, password } = req.body;
    const q = "UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, password = ? WHERE id = ?";
    const values = [firstname, lastname, username, email, password, userId];
    db.query(q, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
        return res.status(200).json({ message: 'User updated successfully' });
    });
}

module.exports = {
    Signup,
    Login,
    getAll,
    getById,
    deleteById,
    editUserById,
    getByEmail,
    Logout
};
