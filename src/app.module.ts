import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { VideosModule } from './videos/videos.module';


@Module({
  imports: [CommonModule, VideosModule],
})
export class AppModule {}
