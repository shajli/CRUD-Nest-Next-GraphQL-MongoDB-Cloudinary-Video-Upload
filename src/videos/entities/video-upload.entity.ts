import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VideoUploadingResponse {
  @Field(() => String, { nullable: true })
  url: string;
  
  @Field(() => String, { nullable: true })
  secure_url: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Int, { nullable: true })
  error?: number;

  @Field(() => Int, { nullable: true })
  success?: number;

  @Field(() => String, { nullable: true })
  public_id?: string;
}