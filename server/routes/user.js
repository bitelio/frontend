'use strict';

import {Router} from 'express';
import * as controller from 'controllers/user';
import {isAuthenticated} from 'services/auth';

var router = new Router();

router.get('/me', isAuthenticated(), controller.me);
router.put('/:id/password', isAuthenticated(), controller.changePassword);
//router.post('/reset', controller.resetPassword);

module.exports = router;
