var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

// MongoDB constants
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
let db; // Define db in the global scope

const port = "8081";
const host = "localhost";

app.get("/steamStore", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to MongoDB");
    db = client.db(dbName); // Assign db here
    const query = {};
    const results = await db.collection("steamStore").find(query).limit(100).toArray();
    console.log(results);
    res.status(200).send(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const steamStoreId = parseInt(req.params.id);
    console.log("Steam Store ID to find:", steamStoreId);
    await client.connect();
    console.log("Node connected successfully to MongoDB");
    db = client.db(dbName); // Assign db here
    const query = { "id": steamStoreId };
    const result = await db.collection("steamStore").findOne(query);
    console.log("Result:", result);
    if (!result) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

// POST: Create a new product
app.post("/steamStore", async (req, res) => {
    try {
      const newProduct = req.body; // Get the new product data from the request body
      await client.connect();
      console.log("Node connected successfully to MongoDB");
      db = client.db(dbName);
      const result = await db.collection("steamStore").insertOne(newProduct);
      console.log("New product added:", result.ops[0]);
      res.status(201).send(result.ops[0]); // Return the added product
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  app.put("/steamStore/:id", async (req, res) => {
    try {
      const steamStoreId = parseInt(req.params.id);
      let updatedProduct = req.body;
      
      // Remove the _id field from the update object if it exists
      if (updatedProduct._id) {
        delete updatedProduct._id;
      }
      
      console.log("Attempting to update product ID:", steamStoreId);
      console.log("Update data:", updatedProduct);
  
      await client.connect();
      db = client.db(dbName);
      const query = { "id": steamStoreId };
      const updateResult = await db.collection("steamStore").updateOne(query, { $set: updatedProduct });
  
      console.log("Update result:", updateResult);
      if (updateResult.modifiedCount === 0) {
        console.log("No document found with ID:", steamStoreId);
        res.status(404).send("Product not found");
      } else {
        res.status(200).send("Product updated successfully");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
  // DELETE: Delete a product
  app.delete("/steamStore/:id", async (req, res) => {
    try {
      const steamStoreId = parseInt(req.params.id);
      console.log("Steam Store ID to delete:", steamStoreId);
      await client.connect();
      console.log("Node connected successfully to MongoDB");
      db = client.db(dbName);
      const query = { "id": steamStoreId };
      const deleteResult = await db.collection("steamStore").deleteOne(query);
      console.log("Delete result:", deleteResult);
      if (deleteResult.deletedCount === 0) {
        res.status(404).send("Not Found");
      } else {
        res.status(200).send("Product deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  