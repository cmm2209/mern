const express = require("express", "mongodb");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const contfiltRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

contfiltRoutes.route("/autfilters").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  var tquery = req.query.tongue;
  var cquery = req.query.century;

  if (Array.isArray(cquery)) {
    var cqueryIntArr = [],
      obj,
      temp = cquery,
      i;
    for (i = 0; i < temp.length; i++) {
      obj = {};
      obj = parseInt(temp[i]);
      cqueryIntArr.push(obj);
    }
    if (Array.isArray(tquery) && cquery) {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { tongue: { $in: tquery }, century: { $in: cqueryIntArr } } },
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
      ]);
      cursor.sort({ _id: 1 }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    } else if (tquery && cquery) {
      const coll = db_connect.collection("titles").find();
      const cursor = coll.aggregate([
        { $match: { tongue: tquery, century: { $in: cqueryIntArr } } },
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
      ]);
      cursor.sort({ _id: 1 }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    } else {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { century: { $in: cqueryIntArr } } },
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
      ]);
      cursor.sort({ _id: 1 }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  } else if (cquery) {
    var cqueryInt = parseInt(cquery);
    if (Array.isArray(tquery) && cquery) {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { tongue: { $in: tquery }, century: cqueryInt } },
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
      ]);
      cursor.sort({ _id: 1 }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    } else if (tquery && cquery) {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { tongue: tquery, century: cqueryInt } },
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
      ]);
      cursor.sort({ _id: 1 }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    } else {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { century: cqueryInt } },
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
      ]);
      cursor.sort({ _id: 1 }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  } else if (Array.isArray(tquery)) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { tongue: { $in: tquery } } },
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
    ]);
    cursor.sort({ _id: 1 }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  } else if (tquery) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { tongue: tquery } },
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
    ]);
    cursor.sort({ _id: 1 }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
  /**
  else if (req.query.author) {
    let aqueryid = req.query.author;
    db_connect
      .collection("titles")
      .find({ author: ObjectId(aqueryid) })
      .sort({title: 1})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
     */
});

module.exports = contfiltRoutes;
