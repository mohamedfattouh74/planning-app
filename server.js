const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ===== CRITICAL FIX =====
// Bind the router db to the server for auth to work
server.db = router.db;

// Middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser); // Add this to handle POST/PUT requests

// Auth middleware (must come after db binding)
server.use(auth);

// Routes
server.use(router);

// Start server
server.listen(3000, () => {
  console.log("JSON Server + Auth running on http://localhost:3000");
});
