const { models } = require('../db');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const organizations = await models.organization.findAll();
  res.status(200).json(organizations);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const organization = await models.organization.findByPk(id);
  if (organization) {
    res.json(organization);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  delete req.body.id;
  await models.organization.create(req.body);
  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  const id = +req.params.id;
  const [rowsUpdated] = await models.organization.update(req.body, {
    where: { id }
  });
  if (rowsUpdated == 1) {
    res.status(204).end();
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const rowsDeleted = await models.organization.destroy({ where: { id } });
  if (rowsDeleted == 1) {
    res.status(204).end();
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
