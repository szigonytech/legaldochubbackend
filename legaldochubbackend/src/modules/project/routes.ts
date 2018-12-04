import { Express } from "express";
import controller from "./controller";
import { handle, authenticateUser } from "../common/request-handler";

export default function(app: Express) {
  app.post("/project", authenticateUser, handle(controller.createProject));
  app.get("/project", authenticateUser, handle(controller.listProjects));
  app.get(
    "/project/:projectId/files",
    authenticateUser,
    handle(controller.listFiles)
  );
  app.get(
    "/project/search/:name",
    authenticateUser,
    handle(controller.searchProjects)
  );
  app.post(
    "/upload/:projectId",
    authenticateUser,
    handle(controller.uploadFile)
  );

  app.get(
    "/project/files/:fileId/compare",
    authenticateUser,
    handle(controller.compare)
  );
  app.get("/project/files/:fileId/view", handle(controller.view));
}
