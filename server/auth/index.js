'use strict';

import express from 'express';
import {authenticate} from './auth.controller';

var router = express.Router();

router.post('/', authenticate);

export default router;
