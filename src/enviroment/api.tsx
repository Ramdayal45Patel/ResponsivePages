import { BaseUrls } from "../models/common/baseUrl";
import { ENV } from "./apiEnviroment";

const baseUrls: BaseUrls | any = {
  local: "http://localhost:4000/api/v1/",
  stag: "https://amsstaging.innobitsystems.com/api/v1/",
  prod: "https://ams.innobitsystems.com/api/v1/",
  load: "",
};
export const baseURL = baseUrls[ENV];
