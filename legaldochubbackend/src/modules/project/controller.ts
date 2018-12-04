import { RequestHandler } from "../common/request-handler";
import { errorValues } from "../../constants/errorValues";
import ProjectRepo from "./repo";
import ProjectService from "./service";
import FileUpload from "../../service/FileService";

export default new class ProjectController {
  createProject = async (handler: RequestHandler) => {
    try {
      handler.validate("name", errorValues.NAME_VALIDAION).notEmpty();
      const userId = handler.getRequestParameter("userId");
      if (!(await handler.performValidation())) {
        return;
      }
      const resp = await new ProjectRepo().createProject(
        handler.getBody().name,
        userId
      );
      return handler.handleCreatedResponse(resp);
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.PROJECT_CREATION_ERROR,
        error: error
      });
    }
  };

  listProjects = async (handler: RequestHandler) => {
    try {
      const userId = handler.getRequestParameter("userId");
      return handler.sendResponse(
        await new ProjectService().findProjects(userId)
      );
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.PROJECT_LISTING_ERROR,
        error: error
      });
    }
  };
  searchProjects = async (handler: RequestHandler) => {
    try {
      const userId = handler.getRequestParameter("userId");
      const name = handler.getRequestParameter("name");
      return handler.sendResponse(
        await new ProjectService().searchProjects(userId, name)
      );
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.PROJECT_LISTING_ERROR,
        error: error
      });
    }
  };
  listFiles = async (handler: RequestHandler) => {
    try {
      const projectId = handler.getRequestParameter("projectId");
      return handler.sendResponse(
        await new ProjectService().listFiles(projectId)
      );
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.FILES_LISTING_ERROR,
        error: error
      });
    }
  };

  uploadFile = async (handler: RequestHandler) => {
    try {
      // const resp = await FileUpload.upload(handler, "file");
      const files: any = handler.getFiles();
      const userId = handler.getRequestParameter("userId");
      const projectId = handler.getRequestParameter("projectId");
      await new ProjectService().fileUpload(files, projectId, userId);
      return handler.sendResponse();
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.UPLOAD_ERROR,
        error: error
      });
    }
  };

  compare = async (handler: RequestHandler) => {
    try {
      const fileId = handler.getRequestParameter("fileId");
      const resp = await new ProjectService().compareFiles(fileId);
      return handler.sendResponse(resp);
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.FILES_COMPARE_ERROR,
        error: error
      });
    }
  };

  view = async (handler: RequestHandler) => {
    try {
      const fileId = handler.getRequestParameter("fileId");
      const resp = await new ProjectService().findFile(fileId);
      const file = `${__dirname}/../../../public/${resp.projectId}/${
        resp.fileName
      }`;
      const currentContent = await new ProjectService().wordExtractor(file);
      return handler.sendResponse(currentContent);
    } catch (error) {
      return handler.sendServerError({
        message: errorValues.FILES_COMPARE_ERROR,
        error: error
      });
    }
  };
}();
