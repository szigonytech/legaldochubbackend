import * as Sequelize from "../../models/base";
import Project from "./models/Project";
import ProjectUsers from "./models/ProjectUsers";
import Users from "../users/models/Users";
import Files from "./models/Files";
import FilesHistory from "./models/FilesHistory";

export default class ProjectRepo {

    findProject = (name: string) => {
        return Project.find<Project>({ where: {name} })
        .then(res => res)
        .catch(error => { throw error; });
    }

    createProject = async (name: string, userId: number) => {
        try {
            const sequelize = await Sequelize.getInstance();
            return sequelize.transaction(async transaction => {
                const project = await Project.create({name, createdBy: userId}, {transaction});
                await ProjectUsers.create({projectId: project.id, userId}, {transaction});
                return project;
            });
        } catch (error) {
            throw error;
        }
    }

    findProjectsByUser = (userId: number) => {
        return Project.findAll<Project>({
            include: [
                {
                    model: Users,
                    as: "accessUsers",
                    where: {id: userId},
                    attributes: []
                }
            ]
        })
        .then(res => res)
        .catch(error => { throw error; });
    }
    searchProjects = (userId: number, name: string) => {
        return Project.findAll<Project>({
            where: {
                name: {$iLike: `%${name}%`}
            },
            include: [
                {
                    model: Users,
                    as: "accessUsers",
                    where: {id: userId},
                    attributes: []
                }
            ]
        })
        .then(res => res)
        .catch(error => { throw error; });
    }

    findFileByName = async (fileName: string, projectId: number) => {
        return Files.find({where: {fileName, projectId}, include: [FilesHistory]})
        .then(res => res)
        .catch(error => { throw error; });
    }
    findFileById = async (id: number) => {
        return Files.find({where: {id}, include: [FilesHistory]})
        .then(res => res)
        .catch(error => { throw error; });
    }
    saveNewFile = async (data: any) => {
        console.log(data);
        return Files.create(data)
        .then(res => res)
        .catch(error => { throw error; });
    }
    saveVersionFile = async (data: any) => {
        try {
            await FilesHistory.update({isLatest: false}, {where: {fileId: data.fileId}});
            await FilesHistory.create(data);
            return;
        } catch (error) {
            throw error;
        }
    }
    updateFileEntry = async (data: any, id: number) => {
        return Files.update(data, {where: {id}})
        .then(res => res)
        .catch(error => { throw error; });
    }
    fileFilesByProjectId = async (projectId: number) => {
        return Files.findAll({where: {projectId}})
        .then(res => res)
        .catch(error => { throw error; });
    }
}