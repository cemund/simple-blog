import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  // view homepage
  res.render("index.ejs", { blogs });
});

app.get("/create", (req, res) => {
  // create post page
  res.render("create.ejs");
});

app.post("/submit", (req, res) => {
  //submit post
  blogs.unshift({
    title: req.body["blog-title"],
    body: req.body["blog-body"],
    date: new Date().toLocaleDateString("en-US"),
  });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  // edit post
  const id = req.params.id;

  if (id * 1 === null) {
    res.render("404.ejs");
  }
  if (id * 1 + 1 > blogs.length) {
    res.render("404.ejs");
  }

  res.render("./edit.ejs", { ...blogs[id * 1], index: id });
});

app.post("/edit/:id", (req, res) => {
  // edit post
  const id = req.params.id;

  if (id * 1 === null) {
    res.render("404.ejs");
  }
  if (id + 1 > blogs.length) {
    res.render("404.ejs");
  }

  blogs[id] = {
    title: req.body["blog-title"],
    body: req.body["blog-body"],
    date: new Date(),
  };

  res.render("./blog.ejs", { ...blogs[id * 1], index: id });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  if (id * 1 === null) {
    res.render("404.ejs");
  }

  if (id * 1 + 1 > blogs.length) {
    console.log("hello");

    res.render("404.ejs");
  }

  res.render("./blog.ejs", { ...blogs[id * 1], index: id });
});

app.delete("/:id", (req, res) => {
  // delete post
  const id = req.params.id;
  blogs.splice(id * 1, 1);
  res.json({ redirect: "/" });
});

app.listen(port, () => {
  console.log("Listening to port " + port);
});

var blogs = [
  {
    title: "The standard Lorem Ipsum passage, used since the 1500s",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date().toLocaleDateString("en-US"),
  },
];

//NOTE: The only way you can get a server redirect to work is by traditional HTML form submission.
// because u nee to manually reload in ajax
