const express = require("express");
const router = express.Router();
const passport = require("passport");

const AuthActions = require("../../auth/AuthActions");
const userActions = require("../../user/userActions");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const authActions = new AuthActions(req.body);
  authActions
    .register()
    .then(user => res.json(user))
    .catch(errors => {
      res.status(400).json(errors);
    });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const authActions = new AuthActions(req.body);
  authActions
    .logIn()
    .then(tokenObject => res.json(tokenObject))
    .catch(errors => res.status(400).json(errors));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

/*
 * @route   GET api/user/get-preferences/:userid
 * @desc    Add comment to post
 * @access  Private
 */
router.get(
  "/get-preferences/:userid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userActions
      .getPreferences(req.params.userid)
      .then(preferences => res.json(preferences))
      .catch(err => res.status(404).json(err));
  }
);

/*
 * @route   POST api/nodes/assign-handle/:id
 * @desc    Add comment to post
 * @access  Private
 */
router.post(
  "/assign-handle/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userActions
      .addOrUpdateHandle(req.body.user_id, req.params.name, req.body.handle)
      .then(user => res.json(user))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
