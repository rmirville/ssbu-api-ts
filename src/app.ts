import express from 'express';
import type { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import debugPkg from 'debug';
import http from 'http';
import morgan from 'morgan';
import type { Port } from '@app/core/types/port';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logger = morgan;
const { debug } = debugPkg;
debug('api-ts:server');

export class App {
	public app: Express;
	public server: http.Server<
		typeof http.IncomingMessage,
		typeof http.ServerResponse
	>;
	public appConfig: { port: Port } = { port: false };

	constructor(config: { port: Port }) {
		// populate app config
		this.appConfig.port = config.port;

		// populate db config

		// set up app dependencies
		this.app = express();

		this.app.set('port', this.appConfig.port);

		this.#initializeMiddleware();
		this.#initializeControllers();

		this.server = http.createServer(this.app);
	}

	/**
	 * Listen on provided port, on all network interfaces.
	 */
	listen = () => {
		this.server.listen(this.appConfig.port);
		this.server.on('error', this.#onError);
		this.server.on('listening', this.#onListening);
	};

	#initializeMiddleware = () => {
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, 'public')));
	};

	#initializeControllers = () => {
		this.app.use('/', indexRouter);
		this.app.use('/users', usersRouter);
	};

	/**
	 * Event listener for HTTP server "error" event.
	 */
	#onError = (error: { syscall: string; code: string }) => {
		let exit = false;

		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind =
			typeof this.appConfig.port === 'string'
				? 'Pipe ' + this.appConfig.port
				: 'Port ' + JSON.stringify(this.appConfig.port);

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				exit = true;
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				exit = true;
				break;
			default:
				throw error;
		}
		if (exit) {
			process.exit(1);
		}
	};

	/**
	 * Event listener for HTTP server "listening" event.
	 */
	#onListening = () => {
		const addr = this.server.address();
		const bind =
			typeof addr === 'string'
				? 'pipe ' + addr
				: 'port ' + JSON.stringify(addr?.port);
		debug('Listening on ' + bind);
	};
}
