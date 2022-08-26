import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./db/connect";
import { productsRouter } from "./routes/productsRoutes";

config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 5000;
const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.use("/api/auth", (req: Request, res: Response) => {
  res.send("auth");
});

app.use("/api/products", productsRouter);

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
