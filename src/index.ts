#!/usr/bin/env node

/**
 * Module dependencies.
 */

import * as appPkg from './app.js';
import debugPkg from 'debug';
import http from 'http';
import type { Express } from 'express';
import { port } from './config/config.app.js';

const { debug } = debugPkg;
debug('api-ts:server');

const app: Express = appPkg.app;

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: string }) {
	let exit = false;

	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind =
		typeof port === 'string' ? 'Pipe ' + port : 'Port ' + JSON.stringify(port);

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
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind =
		typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + JSON.stringify(addr?.port);
	debug('Listening on ' + bind);
}
