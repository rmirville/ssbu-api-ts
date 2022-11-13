#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { port } from './config/config.app.js';
import { App } from './app.js';

const app = new App({ port });
app.listen();
