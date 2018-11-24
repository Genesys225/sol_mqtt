const express = require("express");

const nodesActions = require("../../sensor_nodes/nodesActions");

const passport = require("passport");

const router = express.Router();

/*
 * @route   POST api/nodes/register
 * @desc    register a node
 * @access  Public
 */
router.post("/register", (req, res) => {
  nodesActions
    .register(req.body)
    .then(newNode => {
      res.json(newNode);
    })
    .catch(err => res.status(400).json(err));
});

/*
 * @route   Get api/nodes/scan
 * @desc    Returns curren user
 * @access  Privet
 */
router.get("/get-unregistered", (req, res) => {
  nodesActions.getUnregistered().then(newNodes => {
    res.json(newNodes);
  });
});

/*
 * @route   Get api/nodes/list
 * @desc    Returns curren user
 * @access  Privet
 */
router.get("/get-registered", (req, res) => {
  nodesActions.getRegistered().then(services => {
    res.json(services);
  });
});

/*
 * @route   DELETE api/nodes/:service
 * @desc    Unregistered node 
 * @access  Private
 */
router.delete("/:service", (req, res) => {
  nodesActions
    .unregister(req.params.service)
    .then(resolve => {
      res.json(resolve);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
