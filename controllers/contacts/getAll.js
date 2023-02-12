const Contact = require("../../models/contact");

const { NotFound } = require("http-errors");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filters = { owner: _id };

  const contacts = await Contact.find(filters, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  if (contacts.length === 0) {
    throw new NotFound("Contact not found");
  }
  res.json({
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
