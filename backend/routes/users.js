const { models } = require('../db');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await models.user.findByPk(id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  delete req.body.id;
  await models.user.create(req.body);
  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  const id = +req.params.id;
  const [rowsUpdated] = await models.user.update(req.body, { where: { id } });
  if (rowsUpdated == 1) {
    res.status(204).end();
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const rowsDeleted = await models.user.destroy({ where: { id } });
  if (rowsDeleted == 1) {
    res.status(204).end();
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
