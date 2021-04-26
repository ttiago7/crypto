const { Router } = require('express');
// import all routers;
const currencyRouter = require('./currency.js');
const rateRouter = require('./rate.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/currencies', currencyRouter);
router.use('/rates', rateRouter);

module.exports = router;
