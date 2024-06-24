import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    try {
    console.log('Payload:', payload);
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }
    const userId = BigInt(payload.sub);
      const user = await this.userService.findUserById(userId);
      if (!user){
        throw new UnauthorizedException('Usuario no encontrado');
      }
      const { password, ...result} = user;
      return result;
    }catch (error){
      console.log('Error:', error);
      throw new UnauthorizedException('Usuario no encontrado');
    }
  } 
  
}



/*async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }*/