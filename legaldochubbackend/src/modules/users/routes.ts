import { Express } from "express";
import controller from  "./controller";
import { handle } from "../common/request-handler";

export default function (app: Express) {
    app.post("/signup", handle(controller.signUp));
    app.post("/login", handle(controller.login));
}