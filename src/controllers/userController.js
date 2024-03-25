const User = require("../models/userModels");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const createUser = async (req, res) => {
  const { name, email, category } = { ...req.body };

  if (!name || !email || !category)
    return res
      .status(400)
      .send("Por favor, certifique-se de enviar todos os dados corretamente.");

  const user = new User({
    name,
    email,
    category,
  });

  await user
    .save()
    .catch((err) => res.status(400).send(err))
    .then((result) => res.send({ user: result._id }));
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userUpdated = await User.findByIdAndUpdate(userId, req.body);
    if (!userUpdated) {
      return res.status(404).send("Esse usuário não existe");
    }
    res.status(200).json(userUpdated);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
      res.status(404).send("Usuário não encontrado.");
    }
    res.status(200).send("Usuário excluído com sucesso");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
