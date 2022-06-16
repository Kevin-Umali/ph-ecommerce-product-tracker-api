const express = require("express");
const { shopeeRoutes, lazadaRoutes } = require("./routes");
const app = express();

const port = 3000;

app.use(express.json());

app.use("/API/v1/Shopee", shopeeRoutes);
app.use("/API/v1/Lazada", lazadaRoutes);

app.get("*", function (req, res) {
  res.send("what???", 404);
});

app.listen(process.env.PORT || port, () => {
  console.log(`app listening at ${port}`);
});
