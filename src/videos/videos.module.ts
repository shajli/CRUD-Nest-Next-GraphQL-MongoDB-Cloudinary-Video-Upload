import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { Video, VideoSchema } from './entities/video.entity';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Video.name,
    schema: VideoSchema,
  }])],
  providers: [VideosResolver, VideosService,]
})
export class VideosModule {}
