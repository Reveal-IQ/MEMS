/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 31 AUG 2021        *
*  Version    : 0.1.0.00.01-0821   *
************************************
*/

const router = require('express').Router();
const { validateStatusReq, processStatusReq, validateSTPWZReq, processSTPWZReq } = require("./setupMiddleware");

// Handle RCU Status request
router.post('/api/RCU/Status', [validateStatusReq, processStatusReq]);

// Handle STPWZ request
router.post('/api/CORE/STPWZ', [validateSTPWZReq, processSTPWZReq]);

module.exports = router;