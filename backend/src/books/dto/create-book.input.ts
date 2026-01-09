import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Input type for creating a new book
 * Validates that name and description are non-empty strings
 */
@InputType({ isAbstract: true })
export class CreateBookInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;
}
