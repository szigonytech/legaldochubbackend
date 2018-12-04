import { RequestHandler } from "../modules/common/request-handler";
import * as fs from "fs";
const fse = require("fs-extra");
const filePath = `${__dirname}/../../public`;
export default class FileService {

    static upload = (files: any, key: string, path: string)  => {
        try {
            // const files: any = handler.getFiles();
            const tempFilePath = `${filePath}/${path}`;
            return new Promise(function (resolve, reject) {
             if (files != null) {
                 const file =  files[key];
                const saveFileName = file.name;
                const dir = tempFilePath;
                if (!fs.existsSync(dir)) {
                    fse.ensureDirSync(dir);
                    // fs.mkdirSync(dir);
                }
                 if (file) {
                    file.mv(`${dir}/${saveFileName}`, function (err: Error) {
                         if (err) {
                             reject(err);
                         }
                        resolve(`${dir}/${saveFileName}`);
                     });
                 } else {
                     resolve();
                 }
             } else {
                 resolve(null);
             }
            });
        }
        catch (error) {
            throw error;
        }
    }

    static copy = (oldPath: string, newPath: string) => {
            return fse.copy(`${filePath}/${oldPath}`, `${filePath}/${newPath}`)
                .then((res: any) => res)
                .catch((error: Error) => { throw error; });
    }
}