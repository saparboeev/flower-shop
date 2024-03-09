const express = require("express");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const db = require("./models/index.model");
const session = require("express-session");
const flash = require("connect-flash");
dotenv.config();

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "dashboard",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

app.use("/auth", require("./routes/auth.route"));
app.use("/flowers", require("./routes/main.route"));

const start = async () => {
  try {
    await db.sequelize.sync();

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
