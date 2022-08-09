import { extname } from 'path';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { VideosService } from './videos.service';
import { VideoUploadingResponse } from './entities/video-upload.entity';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import {
  cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from '../utils/cloudinary.config';

@Resolver((of) => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Mutation(() => VideoUploadingResponse)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<object> {
    const { createReadStream, filename } = file;
    const ext = extname(filename);
    if (ext !== '.mp4')
      return {
        error: 400,
        message: 'Bad Request, only mp4 are allowed',
      };
    else {
      /** working code I am leave it here for you and future reference 
      const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
      const uploadedFileName = uniqueSuffix + '_' + filename;
      const stream = createReadStream();
      const pathName = `D:\\cdn\\uploads\\${uploadedFileName}`;
      try {
        await stream.pipe(createWriteStream(pathName));
      } catch (error) {
        throw new Error(error.message);
      }
      */
      const stream = createReadStream();
      let resultUrl = '',
        resultSecureUrl = '',
        resultPublicId = '';
      const cloudinaryUpload = async (stream) => {
        try {
          await new Promise<UploadApiResponse | UploadApiErrorResponse>(
            (resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  resource_type: 'video',
                },
                function (error, result) {
                  if (result) {
                    resultUrl = result.url;
                    resultSecureUrl = result.secure_url;
                    resultPublicId = result.public_id;
                    resolve(result);
                  } else {
                    reject(error);
                  }
                },
              );
              stream.pipe(uploadStream);
            },
          );
        } catch (error) {
          throw new Error(`Failed to upload Video`);
        }
      };

      await cloudinaryUpload(stream);

      const respose = {
        public_id: resultPublicId,
        url: resultUrl,
        secure_url: resultSecureUrl,
        success: 201,
        message: 'Video uploaded successfully',
      };

      return respose;
    }
  }

  @Mutation(() => Video)
  createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videosService.create(createVideoInput);
  }

  @Query(() => [Video], { name: 'videos' })
  findAll() {
    return this.videosService.findAll();
  }

  @Query(() => Video, { name: 'video' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.videosService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput) {
    return this.videosService.update(updateVideoInput.id, updateVideoInput);
  }

  @Mutation(() => Video)
  removeVideo(
    @Args('id', { type: () => String }) id: string,
    @Args('public_id', { type: () => String }) public_id: string,
  ) {
    cloudinary.uploader.destroy(
      public_id,
      { resource_type: 'video' },
      function (error, result) {
        //console.log(result, error);
      },
    );
    return this.videosService.remove(id);
  }
}
