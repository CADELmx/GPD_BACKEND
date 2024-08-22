import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ required: true, description: "Emai del usuario" })
  email: string;

  @ApiProperty({ required: true, description: "Contraseña" })
  password: string;
}