import type { Port } from '@app/core/types/port.js';

export const port: Port = normalizePort(process.env['PORT'] || '3000');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): Port {
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
