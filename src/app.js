import express from "express";
import usersRoutes from "./routes/users.routes.js";
import facultiesRoutes from "./routes/faculties.routes.js";
import fileUpload from "express-fileupload";
import cors from "cors";
const app = express();

//middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(cors());

//routes
app.use("/api/users", usersRoutes);
app.use("/api/faculties", facultiesRoutes);

export default app;
