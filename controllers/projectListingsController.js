const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getListingById,
  createListing,
  deleteListingById,
} = require("../queries/projectListings");

router.get("/", async (req, res) => {
  const getProjects = await getAllProjects();

  if (!Array.isArray(getProjects)) {
    return res.status(500).json({ Error: "Server Error. Please try again." });
  } else {
    return res.json(getProjects);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await getListingById(id);

  if (project.length === 0) {
    return res.status(404).json({
      Error: "GET request unsuccessful",
      message:
        "Listing Not Found! Please try again or enter a different listing id.",
    });
  } else {
    return res.json(project[0]);
  }
});

router.post("/", async (req, res) => {
  const newListing = await createListing(req.body);
  return res.json(newListing);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await deleteListingById(id);

  if (deletedListing === 0) {
    return res.status(404).json({
      Error: "DELETE request unsuccessful.",
      message: "Listing Not Found! Please try again or enter a different listing id.",
    });
  } else {
    return res.json(deletedListing[0]);
  }
});

module.exports = router;
