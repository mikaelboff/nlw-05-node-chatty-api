import "./database";

import { createServer } from "http";
import path from "path";
import express from "express";
import { Server, Socket } from "socket.io";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => res.render("html/client.html"));

app.get("/pages/admin", (req, res) => res.render("html/admin.html"));

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo WS

io.on("connection", (socket: Socket) => console.log("Se conectou", socket.id));

app.use(express.json());

app.use(routes);

export { http, io };
