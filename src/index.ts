import express, { Express } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { connectDB } from "./db/connect";
import { productsRouter } from "./routes/productsRoutes";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import { userRouter } from "./routes/userRoutes";

config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 5000;
const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL || "");
    app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
