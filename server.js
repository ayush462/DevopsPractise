import express from 'express';
import path from 'path';

const app = express();

// Serve static files from "public" folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Routes for APIs
app.get("/test", (req, res) => {
    res.send("CI/CD testing");
});

app.get("/new-test", (req, res) => {
    res.send("New CI/CD working");
});

app.get("/newRoute", (req, res) => {
    res.send("This is CI/CD working fine");
});

// Serve the main UI
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(3000, '0.0.0.0', () => {
    console.log("App is running on port 3000");
});
