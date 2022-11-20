const { Router } = require('express');
const { createLinkClientCompany } = require('../controllers/client-company-controller');

const router = Router();

router.post('/:companyId/:clientId', createLinkClientCompany);

module.exports = router;
