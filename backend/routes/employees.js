const { models } = require('../db');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const employees = await models.employee.findAll();
  res.status(200).json(employees);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const employee = await models.employee.findByPk(id);
  if (employee) {
    res.json(employee);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  delete req.body.id;
  await models.employee.create(req.body);
  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  const id = +req.params.id;
  delete req.body.departmentId;
  const [rowsUpdated] = await models.employee.update(req.body, {
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
  const rowsDeleted = await models.employee.destroy({ where: { id } });
  if (rowsDeleted == 1) {
    res.status(204).end();
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
