import { Injectable, OnModuleInit } from '@nestjs/common';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { Request, Response } from 'express';

@Injectable()
export class RenderService implements OnModuleInit {
    private server: NextServer;

    constructor() {}

    async onModuleInit(): Promise<void> {
        try {
            this.server = createServer({
                // dev: this.configService.get<string>('NODE_ENV') !== 'production',
                dev: true,
                dir: './src/client',
            });
            await this.server.prepare();
        } catch (error) {
            console.error(error);
        }
    }

    getNextServer(): NextServer {
        return this.server;
    }

    handler(req: Request, res: Response) {
        return this.server.getRequestHandler()(req, res);
    }
}