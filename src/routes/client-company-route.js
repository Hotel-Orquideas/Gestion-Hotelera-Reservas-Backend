const { Router } = require('express');
const { createLinkClientCompany, getAllClients, deleteLinkClient } = require('../controllers/client-company-controller');

const router = Router();

router.post('/:companyId/:clientId', createLinkClientCompany);

router.get('/:nit', getAllClients);

router.delete('/:clientId', deleteLinkClient);

module.exports = router;
