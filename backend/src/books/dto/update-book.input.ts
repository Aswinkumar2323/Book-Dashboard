import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { IsOptional, IsString } from 'class-validator';

/**
 * Input type for updating an existing book
 * Extends CreateBookInput but makes all fields optional
 */
@InputType()
export class UpdateBookInput {
    @Field(() => Int)
    id: number;

    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    description: string;
}
