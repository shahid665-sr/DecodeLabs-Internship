// database.js
const { Client } = require('pg');

// Apne database ke credentials yahan dalein
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'decodelabs_db',
    password: 'your_password', // Apna DB password dalein
    port: 5432,
});

client.connect()
    .then(() => console.log("Database connected successfully."))
    .catch(err => console.error("Database connection error", err.stack));

// CRUD: Read Operation
async function getUsers() {
    try {
        const res = await client.query('SELECT * FROM Users');
        return res.rows;
    } catch (err) {
        console.error("Error fetching users:", err.message);
        return [];
    }
}

// CRUD: Create Operation
async function createUser(name, email, role) {
    const query = 'INSERT INTO Users(Name, Email, Role) VALUES($1, $2, $3) RETURNING *';
    const values = [name, email, role];
    
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        throw new Error(err.message);
    }
}
// CRUD: Update Operation (U) - SQL UPDATE
async function updateUser(id, name, email, role) {
    // $1, $2, $3, $4 parameterized queries hain SQL injection se bachne ke liye
    const query = 'UPDATE Users SET Name = $1, Email = $2, Role = $3 WHERE Id = $4 RETURNING *';
    const values = [name, email, role, id];
    
    try {
        const res = await client.query(query, values);
        return res.rows[0]; // Updated record wapas bhejega
    } catch (err) {
        throw new Error(err.message);
    }
}

// CRUD: Delete Operation (D) - SQL DELETE
async function deleteUser(id) {
    const query = 'DELETE FROM Users WHERE Id = $1 RETURNING *';
    try {
        const res = await client.query(query, [id]);
        return res.rows[0]; // Deleted record wapas bhejega taake confirm ho sake
    } catch (err) {
        throw new Error(err.message);
    }
}

// Apne exports ko update kar lein:
module.exports = { getUsers, createUser, updateUser, deleteUser };

module.exports = { getUsers, createUser };