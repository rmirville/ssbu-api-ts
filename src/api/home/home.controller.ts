import type { Request, Response } from 'express';

export class HomeController {
	public index(_req: Request, res: Response) {
		res.json({
			_links: {
				self: {
					href: 'https://api.ssbutools.com/v1/stages',
				},
			},
		});
	}
}
