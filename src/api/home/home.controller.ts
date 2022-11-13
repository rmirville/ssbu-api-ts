import type { Request, Response } from 'express';

export class HomeController {
	public index(_req: Request, res: Response) {
		res.json({ title: 'Express' });
	}
}
