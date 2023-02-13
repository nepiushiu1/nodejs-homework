const Contact = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.user;

  const body = req.body;
  const addContact = await Contact.create({ ...body, owner: _id });
  res.status(201).json({
    data: {
      addContact,
    },
  });
};

module.exports = add;
