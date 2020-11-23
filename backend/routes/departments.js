const { models } = require('../db');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const departments = await models.department.findAll();
  res.status(200).json(departments);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const department = await models.department.findByPk(id);
  if (department) {
    res.json(department);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  delete req.body.id;
  await models.department.create(req.body);
  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  const id = +req.params.id;
  delete req.body.organizationId;
  const [rowsUpdated] = await models.department.update(req.body, {
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
  const rowsDeleted = await models.department.destroy({ where: { id } });
  if (rowsDeleted == 1) {
    res.status(204).end();
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
