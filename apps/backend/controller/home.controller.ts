import express from "express";
export const homeGetController = (
  req: express.Request,
  res: express.Response
) => {
  console.log("asdasdfsf");

  res.send(req.body);
};
