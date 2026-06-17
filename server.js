// server.js
const http = require('http');
const { getUsers, createUser, updateUser, deleteUser } = require('./database');

const server = http.createServer(async (req, res) => {
    // CORS headers - Frontend ko allow karne ke liye
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight request handle karna
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // URL handling ko safe bananay ke liye trailing slash (/) remove karna
    const cleanUrl = req.url.endsWith('/') ? req.url.slice(0, -1) : req.url;
    const urlParts = cleanUrl.split('/');
    const id = urlParts[3]; // ID extract karna

    // 1. GET /api/users - Read Operation
    if (cleanUrl === '/api/users' && req.method === 'GET') {
        const users = await getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    
    // 2. POST /api/users - Create Operation
    else if (cleanUrl === '/api/users' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        
        req.on('end', async () => {
            try {
                const parsedData = JSON.parse(body);
                
                if (!parsedData.name || !parsedData.email) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: "Name and Email are strictly required." }));
                }

                const newUser = await createUser(parsedData.name, parsedData.email, parsedData.role || 'user');
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));

            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Database error.", details: err.message }));
            }
        });
    } 
    
    // 3. PUT /api/users/{id} - Update Operation
    else if (cleanUrl.startsWith('/api/users/') && req.method === 'PUT' && id) {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        
        req.on('end', async () => {
            try {
                const parsedData = JSON.parse(body);
                const updatedUser = await updateUser(id, parsedData.name, parsedData.email, parsedData.role || 'user');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Update failed.", details: err.message }));
            }
        });
    }

    // 4. DELETE /api/users/{id} - Delete Operation
    else if (cleanUrl.startsWith('/api/users/') && req.method === 'DELETE' && id) {
        try {
            const deletedUser = await deleteUser(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "User deleted.", user: deletedUser }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Deletion failed.", details: err.message }));
        }
    }
    
    // 404 Not Found (Agar koi aisi request aye jo upar match na ho)
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint not found." }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Backend API Server running on http://localhost:${PORT}`);
});