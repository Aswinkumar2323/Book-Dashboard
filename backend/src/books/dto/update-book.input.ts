import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateBookInput } from './create-book.input';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
}
