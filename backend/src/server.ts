import express from 'express';
import chart from "../src/routes/chart";
import policies from "./routes/policies";
import seed from "./routes/seed";

const app = express();

const PORT = 3001 || process.env.PORT;

app.use(express.json());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/chart", chart);
app.use("/policies", policies);
app.use("/seed", seed);

app.get("/", (req, res) => {
  res.status(200).send('Connected');
});

app.listen(PORT, () => {
  console.log(`SERVER START ON ${PORT}`);
});
