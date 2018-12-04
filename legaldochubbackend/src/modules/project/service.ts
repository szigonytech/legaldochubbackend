import ProjectRepo from "./repo";
import { errorValues } from "../../constants/errorValues";
import Files from "./models/Files";
import FileService from "../../service/FileService";
const WordExtractor = require("word-extractor");

export default class ProjectService {
  createProject = async (name: string, userId: number) => {
    try {
      const resp = { error: false, errorText: "", values: {} };
      const repo = new ProjectRepo();
      const project = await repo.findProject(name);
      if (project)
        return {
          ...resp,
          error: true,
          errorText: errorValues.NAME_ALREADY_EXISTS
        };
      else {
        const values = await repo.createProject(name, userId);
        return { ...resp, values };
      }
    } catch (error) {
      throw error;
    }
  };

  findProjects = async (userId: number) => {
    try {
      return await new ProjectRepo().findProjectsByUser(userId);
    } catch (error) {
      throw error;
    }
  };
  searchProjects = async (userId: number, name: string) => {
    try {
      return await new ProjectRepo().searchProjects(userId, name);
    } catch (error) {
      throw error;
    }
  };

  fileUpload = async (files: any, projectId: number, userId: number) => {
    try {
      const repo = new ProjectRepo();
      const file = files["file"];
      const fileEntry = await repo.findFileByName(file.name, projectId);
      if (fileEntry) {
        await this.handleExistingFile(
          fileEntry,
          files,
          projectId,
          userId,
          repo
        );
      } else {
        await this.handleNewFile(files, projectId, userId, repo);
      }
      return;
    } catch (error) {
      throw error;
    }
  };
  handleNewFile = async (
    files: any,
    projectId: number,
    userId: number,
    repo: ProjectRepo
  ) => {
    try {
      await FileService.upload(files, "file", projectId.toString());
      const file = files["file"];
      await repo.saveNewFile({
        fileName: file.name,
        projectId,
        uploadedBy: userId
      });
    } catch (error) {
      throw error;
    }
  };

  handleExistingFile = async (
    fileEntry: Files,
    files: any,
    projectId: number,
    userId: number,
    repo: ProjectRepo
  ) => {
    try {
      const file = files["file"];
      const history = fileEntry.history;
      const fileArray = file.name.split(".");
      const fileExt = fileArray.pop();
      const fileSlice = fileArray.join(".");
      const newFileName = `${fileSlice}_V${history.length}.${fileExt}`;
      await FileService.copy(
        `${projectId}/${file.name}`,
        `${projectId}/history/${fileEntry.id}/${newFileName}`
      );
      await FileService.upload(files, "file", projectId.toString());
      await repo.saveVersionFile({
        versionName: newFileName,
        fileId: fileEntry.id,
        isLatest: true,
        uploadedBy: userId
      });
      await repo.updateFileEntry(
        { fileName: file.name, projectId, uploadedBy: userId },
        fileEntry.id
      );
    } catch (error) {
      throw error;
    }
  };

  listFiles = async (projectId: number) => {
    try {
      return await new ProjectRepo().fileFilesByProjectId(projectId);
    } catch (error) {
      throw error;
    }
  };

  compareFiles = async (fileId: number) => {
    try {
      const resp = { error: false, errorText: "", values: {} };
      const repo = new ProjectRepo();
      const file = await repo.findFileById(fileId);
      if (file.history.length === 0)
        return {
          ...resp,
          error: true,
          errorText: errorValues.COMPARE_VALIDATION
        };
      const previousVersion = file.history.filter(f => f.isLatest)[0];
      const currentFile = `${__dirname}/../../../public/${file.projectId}/${
        file.fileName
      }`;
      const previousFile = `${__dirname}/../../../public/${
        file.projectId
      }/history/${file.id}/${previousVersion.versionName}`;
      const currentContent = await this.wordExtractor(currentFile);
      const previousContent = await this.wordExtractor(previousFile);
      return await this.difference(currentContent, previousContent);
    } catch (error) {
      throw error;
    }
  };

  wordExtractor = (file: string) => {
    const extractor = new WordExtractor();
    const extracted = extractor.extract(file);
    return extracted
      .then((doc: any) => doc.getBody())
      .catch((error: Error) => {
        throw error;
      });
  };

  difference = (currentContent: string, previousContent: string) => {
    const Diff = require("text-diff");
    const diff = new Diff({ timeout: 2, editCost: 6 });
    const textDiff = diff.main(previousContent, currentContent);
    diff.cleanupEfficiency(textDiff);
    return diff.prettyHtml(textDiff);
  };

  findFile = async (fileId: number) => {
    try {
      const repo = new ProjectRepo();
      const file = await repo.findFileById(fileId);
      return file;
    } catch (error) {
      throw error;
    }
  };
}
