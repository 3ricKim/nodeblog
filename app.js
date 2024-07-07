const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    { title: "GI", snippet: "Adasdsa" },
    { title: "bsb", snippet: "asdadw" },
    { title: "bf", snippet: "asdadsadadasdasdas" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

//basically default req handler (if none matches above)
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
