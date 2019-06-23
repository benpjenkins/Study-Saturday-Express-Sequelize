const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!student) {
      next();
    } else {
      res.send(student);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (err) {
    console.error(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (err) {
    console.error(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let updatedStudentInfo = await Student.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.send(updatedStudentInfo[1]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  await Student.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).send();
});

module.exports = router;
