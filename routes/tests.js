const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/:id', async (req, res, next) => {
  try {
    let test = await Test.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(test);
  } catch (err) {
    next(err);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.studentId);
    let test = await Test.create(req.body);
    let studentTest = await test.setStudent(student);
    res.status(201).send(studentTest);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (err) {
    console.error(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  await Test.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).send();
});

module.exports = router;
