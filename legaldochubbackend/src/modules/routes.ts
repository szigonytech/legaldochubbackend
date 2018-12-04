import * as homeController from "./home/controller";
import { Express } from "express";

import { default as pingRoutes } from "./ping/routes";
import { default as usersRoutes } from "./users/routes";
import { default as projectRoutes } from "./project/routes";

export default function (app: Express) {
    app.get("/", homeController.index);
    pingRoutes(app);
    usersRoutes(app);
    projectRoutes(app);
}
