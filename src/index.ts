#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app.js';
import debugPkg from 'debug'; //  debug = require('debug')('api-ts:server');
import http from 'http';

const { debug } = debugPkg;

/**
 * Get port from environment and store in Express.
 */

const port: number | string | false = normalizePort(
	process.env['PORT'] || '3000'
);
app.set('port', port);

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
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | false {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: any }) {
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
