import express from 'express';
import type { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import morgan from 'morgan';
import { port } from './config/config.app.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logger = morgan;

export class App {
	public app: Express;
	public server!: http.Server<
		typeof http.IncomingMessage,
		typeof http.ServerResponse
	>;
	constructor() {
		this.app = express();
		this.app.set('port', port);

		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, 'public')));

		this.app.use('/', indexRouter);
		this.app.use('/users', usersRouter);
		const server = http.createServer(this.app);

		/**
		 * Listen on provided port, on all network interfaces.
		 */
		server.listen(port);
	}
}

export const app: Express = new App().app;
