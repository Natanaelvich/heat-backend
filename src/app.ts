import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";

import { router } from "./routes";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`A stranger has connected ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.get("/github", (request, response) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;

  response.redirect(url);
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };