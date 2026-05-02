const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const questionRoutes = require("./routes/questions");
const guideRoutes = require("./routes/guides");
const adminRoutes = require("./routes/admin");
const expertRoutes = require("./routes/experts");
const forumRoutes = require("./routes/forum");
const reviewRoutes = require("./routes/reviews");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/experts", expertRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});