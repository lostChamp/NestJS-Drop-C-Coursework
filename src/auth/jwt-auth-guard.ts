import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const token = req.cookies.jwtToken;

            if(!token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});
            }

            const user = this.jwtService.verify(token);
            req.user = user;

            return true;
        }catch (err) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"});
        }
    }
}