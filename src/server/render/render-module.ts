import { Module } from '@nestjs/common';
import {RenderController} from "./render-controller";
import {RenderService} from "./render.service";

@Module({
  imports: [],
  providers: [RenderService],
  controllers: [RenderController],
})
export class RenderModule {}