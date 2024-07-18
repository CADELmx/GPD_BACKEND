import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    private getTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization.split(' ') ?? []
        return type === 'Bearer' ? token : null;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (Boolean(Number(process.env.SKIP_AUTH))) {
            return true;
        }
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.getTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Sin autorización, token no encontrado');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }

}