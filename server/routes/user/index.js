'use strict';

import {Router} from 'express';
import * as controller from './user.controller';

var router = new Router();

router.get('/', controller.profile);
router.put('/password', controller.changePassword);

module.exports = router;
