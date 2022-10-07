const { Router } = require('express');
const { createEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../controllers/employee-controller');

const router = Router();

router.post('/', createEmployee);

router.get('/:id', getEmployee);

router.get('/', getAllEmployees);

router.put('/:id', updateEmployee);

router.patch('/:id', deleteEmployee);

module.exports = router;
