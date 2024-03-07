import { BaseUrls } from "../models/common/baseUrl";
import { ENV } from "./apiEnviroment";

const baseUrls: BaseUrls | any = {
  local: "https://backend-ru3i.onrender.com/api/v1/",
  stag: "https://backend-ru3i.onrender.com/api/v1/",
  prod: "https://backend-ru3i.onrender.com/api/v1/",
};
export const baseURL = baseUrls[ENV];
