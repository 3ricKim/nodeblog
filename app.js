const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
app.use(morgan("dev"));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "asdsadsa",
//     snippet: "about my new blog",
//     body: "Body",
//   });
//   blog
//     .save()
//     .then(() => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req,res)=>{
//     Blog.findById('668b92806b67756ecf53d439')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

app.get("/", (req, res) => {
    res.redirect('/blogs');
//   const blogs = [
//     { title: "GI", snippet: "Adasdsa" },
//     { title: "bsb", snippet: "asdadw" },
//     { title: "bf", snippet: "asdadsadadasdasdas" },
//   ];
//   res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get('/blogs', (req,res)=> {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', { title: "All Blogs", blogs: result})
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

//basically default req handler (if none matches above)
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
