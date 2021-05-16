const dotenv = require("dotenv");
dotenv.config();

const startServer = require("./app");

// const path = require('path');
// global.__rootDir = path.resolve(__dirname);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
startServer();