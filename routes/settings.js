const express = require("express");
const { asyncHandler } = require("./utils");
const fetch = require("node-fetch");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.cookies[`TAPPDIN_CURRENT_USER_ID`], 10);
    if (!id) return res.redirect("/log-in");
    const backendRes = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
      },
    });
    const json = await backendRes.json();
    const user = json.user;
    res.render("settings", { user });
  })
);

router.post(
  "/update",
  asyncHandler(async (req, res) => {
    const newInfo = req.body;
    const id = parseInt(req.cookies[`TAPPDIN_CURRENT_USER_ID`], 10);
    if (!id) return res.redirect("/log-in");
    newInfo.id = id;
    try {
      backendRes = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(newInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
        },
      });
      const user = await backendRes.json();
      console.log(user)
      res.render("settings", {user});
    } catch (err) {
      console.error(err);
    }
  })
);

router.post("/change-password", asyncHandler(async (req, res) => {
    const id = parseInt(req.cookies[`TAPPDIN_CURRENT_USER_ID`], 10);
    if (!id) return res.redirect("/log-in");
    const {oldPassword, newPassword} = req.body;
    const newInfo = {oldPassword, newPassword};
    try {
      backendRes = await fetch(`${process.env.BACKEND_URL}/users/${id}/password`, {
        method: "PUT",
        body: JSON.stringify(newInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
        },
      });
      const user = await backendRes.json();
      console.log(user);
      res.render("settings", { user });
    } catch (err) {
      console.error(err);
    }

}));
module.exports = router;