import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';

/**
 * Input type for updating an existing book
 * Extends CreateBookInput but makes all fields optional using PartialType
 */
@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field(() => Int)
    id: number;
}
