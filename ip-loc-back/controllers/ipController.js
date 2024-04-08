const express = require('express');

function ipController(IP) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    res.status(501).send("Not implemented");
    // TODO: Implement the IP creation
  });

  router.get("/", async (req, res) => {
    res.status(501).send("Not implemented");
    // TODO: Implement the IP listing
  });

  router.get("/:id", async (req, res) => {
    res.status(501).send("Not implemented");
    // TODO: Implement the IP retrieval by IP
  });

  router.put("/:id", async (req, res) => {
    res.status(501).send("Not implemented");
    // TODO: Implement the IP update by IP
  });

  router.delete("/:id", async (req, res) => {
    res.status(501).send("Not implemented");
    // TODO: Implement the IP deletion by IP
  });

  return router;
}

module.exports = {
  ipController
}