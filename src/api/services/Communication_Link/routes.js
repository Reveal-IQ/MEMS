/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.00.03-0521   *
************************************
*/

const router = require('express').Router();
const { validateUSLGNReq, processUSLGNReq,validateStatusReq, processStatusReq } = require("./middleware");

// Handle RCU Status request
router.post('/api/RCU/Status', [validateStatusReq, processStatusReq]);

// Handle USLGN request
router.post('/api/CURA/USLGN', [validateUSLGNReq, processUSLGNReq])

module.exports = router;