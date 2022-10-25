const { Router } = require('express');
const { createCompany, getCompany, getAllCompanies, updateCompany, deleteCompany } = require('../controllers/company-controller');

const router = Router();

router.post('', createCompany);

router.get('/:nit', getCompany);

router.get('/', getAllCompanies);

router.put('/:nit', updateCompany);

router.patch('/:nit', deleteCompany);

module.exports = router;
