import { IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    url: string;
}