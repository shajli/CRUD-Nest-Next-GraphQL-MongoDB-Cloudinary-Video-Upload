import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async create(createVideoInput: CreateVideoInput): Promise<Video> {
    try {
      const createdVedio = new this.videoModel(createVideoInput);
      return await createdVedio.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Video[]> {
    try {
      return await this.videoModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Videos Not Found');
    }
  }

  async findOne(id: string): Promise<Video> {
    try {
      return await this.videoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Video Not Found');
    }
  }

  async update(id: string, updateVideoInput: UpdateVideoInput): Promise<Video> {
    try {
      return await this.videoModel
        .findByIdAndUpdate(id, updateVideoInput)
        .exec();
    } catch (error) {
      throw new NotFoundException('Video Not Found');
    }
  }

  async remove(id: string): Promise<Video> {
    
    try {
      return await this.videoModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new NotFoundException('Video Not Found');
    }
  }
}
