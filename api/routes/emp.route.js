const router = require("express").Router();
const { Signup, Login, getAll, getById, getByEmail, deleteById, editUserById } = require("../controllers/emp.cont");

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /api/emp/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee registered successfully
 *       400:
 *         description: Invalid email format or email already exists
 *       500:
 *         description: Failed to insert employee
 */
router.post("/register", Signup);

/**
 * @swagger
 * /api/emp/login:
 *   post:
 *     summary: Login an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to authenticate
 */
router.post("/login", Login);

/**
 * @swagger
 * /api/emp/all:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *       500:
 *         description: Failed to retrieve employees
 */
router.get("/all", getAll);

/**
 * @swagger
 * /api/emp/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Failed to retrieve employee
 */
router.get("/:id", getById);

/**
 * @swagger
 * /api/emp/email/{email}:
 *   get:
 *     summary: Get employee by email
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Employee email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Failed to retrieve employee
 */
router.get("/email/:email", getByEmail);

/**
 * @swagger
 * /api/emp/delete/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Failed to delete employee
 */
router.delete("/delete/:id", deleteById);

/**
 * @swagger
 * /api/emp/edit/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               national_identity:
 *                 type: string
 *               telephone:
 *                 type: string
 *               email:
 *                 type: string
 *               department_name:
 *                 type: string
 *               position:
 *                 type: string
 *               laptop_manufacturer:
 *                 type: string
 *               model:
 *                 type: string
 *               serial_number:
 *                 type: string
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               national_identity: "123456789"
 *               telephone: "123-456-7890"
 *               email: john.doe@example.com
 *               department_name: IT
 *               position: Developer
 *               laptop_manufacturer: Dell
 *               model: XPS 15
 *               serial_number: "ABC123456"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       500:
 *         description: Failed to update user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update user
 */
router.put("/edit/:id", editUserById);

module.exports = router;
