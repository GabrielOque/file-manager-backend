import express from "express";
import usersRoutes from "./routes/users.routes.js";
import facultiesRoutes from "./routes/faculties.routes.js";
import filesRoutes from "./routes/files.routes.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

//middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/users", usersRoutes);
app.use("/api/faculties", facultiesRoutes);
app.use("/api/files", filesRoutes);

export default app;
