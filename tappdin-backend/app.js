const express = require("express");
const morgan = require("morgan");
const { environment , frontEndServer } = require('./config');
const cors = require("cors");
const indexRouter = require('./routes/index');
// const tweetRouter = require('./routes/tweets');
const userRouter = require('./routes/users');
const testRouter = require('./routes/test');
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: frontEndServer }))
//routes
app.use('/', indexRouter);
// app.use('/tweets', tweetRouter);
// app.use("/users", userRouter);
app.use('/test', testRouter);


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
