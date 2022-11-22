const { Router } = require('express');
const { createLinkClientCompany, getAllClients } = require('../controllers/client-company-controller');

const router = Router();

router.post('/:companyId/:clientId', createLinkClientCompany);

router.get('/:id', getAllClients);

module.exports = router;
