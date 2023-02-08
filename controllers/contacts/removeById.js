const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const removedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  });
  if (!removedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    data: {
      removedContact,
    },
    message: "contact deleted",
  });
};

module.exports = removeById;
