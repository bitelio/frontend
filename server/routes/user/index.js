'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import {isAuthenticated} from '../auth/auth.service';

var router = new Router();

router.get('/', isAuthenticated(), controller.profile);
router.put('/password', isAuthenticated(), controller.changePassword);

module.exports = router;
