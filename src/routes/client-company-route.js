const { Router } = require('express');
const { createLinkClientCompany, getAllClients, updateLinkClient } = require('../controllers/client-company-controller');

const router = Router();

router.post('/:companyId/:clientId', createLinkClientCompany);

router.get('/:id', getAllClients);

router.put('/:clientId', updateLinkClient);

module.exports = router;
