const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
const app = express();
const upload = multer({ dest: "public/uploads" });

const users = [];

app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
	res.send("Upload API");
});

// @desc 	User List
// @route 	GET /user
// @access 	Public
app.get("/user", (req, res) => {
	res.json(users);
});

// @desc 	Upload an image
// @route 	POST /user
// @access 	Public
app.post("/user", upload.single("image"), (req, res) => {
	fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));

	users.push({
		userName: req.body.userName,
		image: req.file.originalname,
	});

	res.json(users);
});

app.get("*", (_req, res) => {
	res.status(404).send("Error 404");
});

app.listen(PORT, () => {
	console.log(`Server listen on port : ${PORT}`);
});
