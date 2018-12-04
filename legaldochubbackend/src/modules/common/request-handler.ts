import { Request, Response } from "express";
import UserRepo from "../users/repo";

export class RequestHandler {
  private request: Request;
  private response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  getBody() {
    return this.request.body;
  }
  getResponse() {
    return this.response;
  }
  getRequest() {
    return this.request;
  }
  getFiles() {
    return this.request.files;
  }
  getRequestParameter(key: string) {
    return this.request.params[key];
  }

  validate(field: string, message: string) {
    return this.request.assert(field, message);
  }

  async performValidation(): Promise<boolean> {
    const result = await this.request.getValidationResult();
    if (!result.isEmpty()) {
      this.sendValidationError(result.array()[0].msg);
      return false;
    }
    return true;
  }

  sendResponse(data?: object) {
    return this.response.status(200).send(data);
  }

  sendNotFoundResponse() {
    return this.response.status(404).send();
  }

  sendCreatedResponse(data?: object) {
    return this.response.status(201).send(data);
  }

  sendValidationError(error?: any) {
    return this.response.status(400).send({error});
  }

  sendServerError(error?: any) {
    console.log(error);
    return this.response.status(500).send({error});
  }

  handleCreatedResponse (data: { error: boolean, errorText: string, values: any }) {
    if (data.error) return this.sendValidationError(data.errorText);
    else return this.sendCreatedResponse(data.values);
  }

  handleResponse (data: { error: boolean, errorText: string, values: any }) {
    if (data.error) return this.sendValidationError({message: data.errorText});
    else return this.sendResponse(data.values);
  }
}

export function handle(method: (handler: RequestHandler, next?: () => void) => void) {
  return (request: Request, response: Response, next: () => void) => {
    method(new RequestHandler(request, response), next);
  };
}

export async function authenticateUser (request: Request, response: Response, next: (error?: any) => void) {
  const authTokenString = (request.headers["authorization"] || "").toString();
  if (!authTokenString) return response.send(401).end();
  const authToken = authTokenString.split("Bearer ")[1];
  const user = await new UserRepo().findUserByToken(authToken);
  if (!user) return response.sendStatus(401).end();
  else request.params.userId = user.id;
  next();
}