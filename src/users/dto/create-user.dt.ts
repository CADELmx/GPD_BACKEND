import { PersonalDataDto } from "./create-personalData.dto"
import { Type } from 'class-transformer'

export class CreateUserDto{
  email: string
  password: string
  @Type(() => PersonalDataDto)
  nt: PersonalDataDto
  active?: boolean = true
  //personalData?: PersonalDataDto;
}