const express = require('express');
const { addUsers, getAllUsers, getUsers, updateUsers, deleteUsers } = require('../controller/users');
const router = express.Router();

router.route("/users").post(addUsers);
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUsers);
router.route("/users/:id").put(updateUsers);
router.route("/users/:id").delete(deleteUsers);


module.exports = router;