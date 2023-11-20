import {
    CanActivate,
    ExecutionContext, ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if(!requiredRoles) {
                return true;
            }

            const token = req.cookies.jwtToken

            if(!token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            if(requiredRoles.includes(req.user.roles)) {
                return true;
            }
        }catch (err) {
            throw new ForbiddenException();
        }
    }
}