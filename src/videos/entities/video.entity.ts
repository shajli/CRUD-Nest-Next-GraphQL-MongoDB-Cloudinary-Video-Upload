import { ObjectType, Field} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@ObjectType()
@Schema()
export class Video {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  category: string;

  @Prop()
  @Field(() => [String])
  tags: string[];

  @Prop()
  @Field(() => String)
  url: string;

  @Prop()
  @Field(() => String)
  secure_url: string;

  @Prop()
  @Field(() => String)
  public_id: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
