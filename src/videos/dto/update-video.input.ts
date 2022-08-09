import { CreateVideoInput } from './create-video.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => String, {description: "Video ID"})
  id: string;
}
