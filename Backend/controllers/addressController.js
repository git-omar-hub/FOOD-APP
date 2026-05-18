import addressModel from "../models/addressModel.js";

const addAddress = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.firstName) data.firstName = data.firstName;
    if (data.fristName) { data.firstName = data.fristName; delete data.fristName; }
    const address = new addressModel({ ...data, userId: req.body.userId });
    await address.save();
    res.json({ success: true, message: "Address saved", data: address });
  } catch (error) {
    res.json({ success: false, message: "Error saving address" });
  }
};

const listAddresses = async (req, res) => {
  try {
    const addresses = await addressModel.find({ userId: req.body.userId });
    res.json({ success: true, data: addresses });
  } catch (error) {
    res.json({ success: false, message: "Error fetching addresses" });
  }
};

const removeAddress = async (req, res) => {
  try {
    await addressModel.findOneAndDelete({ _id: req.body.id, userId: req.body.userId });
    res.json({ success: true, message: "Address removed" });
  } catch (error) {
    res.json({ success: false, message: "Error removing address" });
  }
};

export { addAddress, listAddresses, removeAddress };
