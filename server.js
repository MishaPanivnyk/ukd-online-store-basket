const mongoose = require("mongoose");

const app = require("./app");

const PORT = 3000;

mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://panivnykm:rFFpC2pht0mAXOCu@cluster0.j1vfp3y.mongodb.net/ukdShop?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
