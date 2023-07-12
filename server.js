const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const masterPassword = require("./routes/masterPassword");
const savePassowrd = require("./routes/savePassowrd");
const findPassword = require("./routes/findPassword");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/master", masterPassword);
app.use("/api/password/save", savePassowrd);
app.use("/api/password/find", findPassword);

app.use(errorHandler);

const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));
