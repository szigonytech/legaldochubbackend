/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression"; // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as flash from "express-flash";
import * as path from "path";
import expressValidator = require("express-validator");
import { EventEmitter } from "events";
import * as Sequelize from "./models/base";
import { default as routes } from "./modules/routes";
import * as cors from "cors";
import { authenticateUser } from "./modules/common/request-handler";
const fileUpload = require("express-fileupload");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("emitter", new EventEmitter());
app.set("emitter", new EventEmitter());
app.set("view engine", "pug");
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
  );
  next();
});
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

app.get("emitter").on("appStarted", function() {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});

// app.use("/files", );
app.use("/files", [express.static(path.join(__dirname, "../public"))]);

initializeApplication().catch(error => {
  console.log("Error occurred when initializing app.");
  console.log(error);
  process.exit();
});

module.exports = app;

async function initializeApplication() {
  routes(app);
  const sequelize = await Sequelize.initialize();
  await sequelize.authenticate();
  app.listen(app.get("port"), () => {
    app.get("emitter").emit("appStarted");
  });
  return;
}
