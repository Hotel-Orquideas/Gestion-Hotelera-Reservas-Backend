const { Router } = require('express');
const { createEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../controllers/employee-controller');

const router = Router();

router.post('/', createEmployee);

router.get('/:doc', getEmployee);

router.get('/', getAllEmployees);

router.put('/:doc', updateEmployee);

router.patch('/:doc', deleteEmployee);

module.exports = router;
