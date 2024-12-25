import ymal from "js-yaml";
import fs from "fs";
import path from "path";

type config = {
  hostUrl: string;
  appName: string;
  port: number;
  jwt: {
    secret: string;
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
};

export const configApp = ymal.load(
  fs.readFileSync(path.join(__dirname, "../config.yml"), "utf8")
) as config;
