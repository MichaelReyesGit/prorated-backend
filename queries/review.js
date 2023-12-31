const db = require("../db/dbConfig");

const getContractorReviews = async (contractorId) => {
  try {
    const contractorReviews = await db.any(
      "SELECT * FROM reviews WHERE contractor_id = $1",
      [contractorId]
    );
    return contractorReviews;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

const getUserReviews = async (userId) => {
  try {
    const userReviews = await db.any(
      "SELECT * FROM reviews LEFT JOIN contractors ON reviews.contractor_id = contractors.id WHERE user_id = $1",
      [userId]
    );
    return userReviews;
  } catch (e) {
    return e.message;
  }
};

const addContractorReview = async (id, userId, data) => {
  try {
    console.log(data);
    const addedReview = await db.one(
      "INSERT INTO reviews (contractor_id, user_id, name, review, rating) values ($1, $2, $3, $4, $5) RETURNING *",
      [id, userId, data.name, data.review, data.rating]
    );
    return addedReview;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

module.exports = {
  getContractorReviews,
  addContractorReview,
  getUserReviews,
};
