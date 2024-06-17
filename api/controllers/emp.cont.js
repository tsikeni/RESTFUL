const db = require('../config/Connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const Signup =(req,res)=> {
    try {
        const q = `
            INSERT INTO employees(
                firstname, lastname, national_identity, telephone, email, 
                department_name, position, laptop_manufacturer, model, serial_number
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const { 
            firstname, lastname, national_identity, telephone, email, 
            department_name, position, laptop_manufacturer, model, serial_number 
        } = req.body;

        const values = [
            firstname, lastname, national_identity, telephone, email, 
            department_name, position, laptop_manufacturer, model, serial_number
        ];

        db.query(q, values, (error, data) => {
            if (error) {
                console.error('Error inserting employer into the database: ' + error.stack);
                return res.status(500).json({ error: 'Failed to insert employer' });
            }
            return res.status(201).json({ message: 'Employer registered successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


const Login = (req,res)=>{
    const { email, password } = req.body;

    // Replace with your query to get user by email
    db.query('SELECT * FROM employees WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error' });
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ token });
        });
    });
}



const getAll =(req,res)=>{
    const q = "SELECT * FROM employees";
    db.query(q, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        return res.status(200).json(results);
    });
}


const getById =(req,res)=> {
    const userId = req.params.id;
    const q = "SELECT * FROM employees WHERE id = ?";
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


const getByEmail =(req,res)=>{
    const userEmail = req.params.email;
    const q = "SELECT * FROM employees WHERE email = ?";
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


const deleteById  =(req,res)=>{
    const userId = req.params.id;
    const q = "DELETE FROM employees WHERE id = ?";
    db.query(q, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    });
}




const editUserById =(req,res)=> {
    const empId = req.params.id;
    const { 
        firstname, lastname, national_identity, telephone, email, 
        department_name, position, laptop_manufacturer, model, serial_number 
    } = req.body;

    const q = "UPDATE employees SET firstname = ?, lastname = ?, national_identity = ?, telephone = ?, email = ?, department_name = ?, position = ?, laptop_manufacturer = ?, model = ?, serial_number = ? WHERE id = ?";
    const values = [
        firstname, lastname, national_identity, telephone, email, 
        department_name, position, laptop_manufacturer, model, serial_number, empId
    ];
    
    db.query(q, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update user', err });
        }
        return res.status(200).json({ message: 'User updated successfully', results });
    });
}




module.exports = {
    Signup,
    Login,
    getAll,
    getById,
    deleteById,
    editUserById,
    getByEmail
};
