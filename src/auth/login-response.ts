import { ApiProperty } from "@nestjs/swagger";

export class UserLogued {
  @ApiProperty()
  name: string

  @ApiProperty()
  email: string
}

/**
 * Tipo de respuesta al autenticar a un usuario
 */
export class LoginResponse {
  @ApiProperty({ description: "Usuario autenticado" })
  user: UserLogued

  @ApiProperty()
  access_token: string
}