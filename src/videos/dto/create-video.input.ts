import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String, { description: 'Video Title' })
  title: string;

  @Field(() => String, { description: 'Categoy of Vedio' })
  category: string;

  @Field(() => [String], { description: 'Tags for Video' })
  tags: string[];

  @Field(() => String, { description: 'Vedio URI' })
  url: string;

  @Field(() => String, { description: 'Vedio URI' })
  secure_url: string;

  @Field(() => String, { description: 'Vedio URI' })
  public_id: string;
}
