import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import { RenderService } from './render.service';

@Controller('/')
export class RenderController {
    constructor(private renderService: RenderService) {}

    @Get('test')
    public async showTest(@Req() req: Request, @Res() res: Response) {
        const parsedUrl = parse(req.url, true);
        const serverSideProps = { dataFromController: '123' };

        await this.renderService
            .getNextServer()
            .render(
                req,
                res,
                parsedUrl.pathname,
                Object.assign(parsedUrl.query, serverSideProps),
            );
    }

    @Get('home')
    public async showHome(@Req() req: Request, @Res() res: Response) {
        await this.renderService.handler(req, res);
    }

    @Get('_next*')
    public async assets(@Req() req: Request, @Res() res: Response) {
        await this.renderService.handler(req, res);
    }

    @Get('favicon.ico')
    public async favicon(@Req() req: Request, @Res() res: Response) {
        await this.renderService.handler(req, res);
    }
}