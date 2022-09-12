const express = require("express", "mongodb");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const contRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

var pipeline = [
  {
    $set: {
      treatises: ["$url", "$title"],
    },
  },
  {
    $group: {
      _id: "$author",
      treatises: {
        $push: "$treatises",
      },
    },
  },
  {
    $lookup: {
      from: "authors",
      localField: "_id",
      foreignField: "_id",
      as: "authordeets",
    },
  },
  {
    $set: {
      authorname: "$authordeets.authorSt",
    },
  },
  {
    $project: {
      _id: 0,
      treatises: 1,
      authorname: 1,
    },
  },
];

// This section will help you get a list of all the records.
contRoutes.route("/authors").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  const coll = db_connect.collection("titles");
  const cursor = coll.aggregate(pipeline);
  cursor.sort({ _id: 1 }).toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = contRoutes;
