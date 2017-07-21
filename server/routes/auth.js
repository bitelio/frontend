'use strict';

import {Router} from 'express';
import {authenticate} from 'controllers/auth';

var router = new Router();

router.post('/', authenticate);

module.exports = router;
