export const port: number | string | false = normalizePort(
	process.env['PORT'] || '3000'
);

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
