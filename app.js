const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const dbURI =
  "mongodb+srv://3ricKim:eric1234@nodeblog.nos6l1e.mongodb.net/node?retryWrites=true&w=majority&appName=NodeBlog";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs', blogRoutes);

//basically default req handler (if none matches above)
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
