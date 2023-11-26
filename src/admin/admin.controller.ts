import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";

@Controller('admin')
export class AdminController {
  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("")
  async adminPage() {

  }
}
