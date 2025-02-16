import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional() 
  @IsString()
  phone?: string;
}
