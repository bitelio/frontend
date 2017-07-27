'use strict';

import {Router} from 'express';
import {authenticate} from './auth.controller';
import * as user from '../user/user.controller';

var router = new Router();

router.post('/', authenticate);
router.post('/request', user.requestPassword);
router.post('/reset', user.resetPassword);

module.exports = router;
