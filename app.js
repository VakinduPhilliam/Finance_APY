const app = require('./index'); // Fetch APIs

const port = 5000;

// Set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

