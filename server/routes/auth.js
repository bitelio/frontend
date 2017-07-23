'use strict';

import {Router} from 'express';
import {authenticate} from 'controllers/auth';
import * as user from 'controllers/user';

var router = new Router();

router.post('/', authenticate);
router.post('/request', user.requestPassword);
router.post('/reset', user.resetPassword);

module.exports = router;
