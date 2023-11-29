import { Controller, Get, Param, ParseIntPipe, Req, Res, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LotService } from "../lot/lot.service";
import { OrderService } from "../order/order.service";
import { ServiceService } from "../service/service.service";
import { ManufacturerService } from "../manufacturer/manufacturer.service";
import { CategoryService } from "../category/category.service";

@Controller('admin')
export class AdminController {

  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService,
              private readonly wareService: LotService,
              private readonly orderService: OrderService,
              private readonly serviceService: ServiceService,
              private readonly manService: ManufacturerService,
              private readonly categoryService: CategoryService) {}

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("")
  async adminPage(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    if(token) {
      return res.render("admin-main", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/users")
  async adminUsers(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const people = await this.userService.getAllUsers();
    if(token) {
      return res.render("admin-users", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        people: people,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/ware")
  async adminWare(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const ware = await this.wareService.getAllWares();
    if(token) {
      return res.render("admin-ware", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        ware: ware,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/orders")
  async adminOrders (@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const order = await this.orderService.getAllOrders();
    if(token) {
      return res.render("admin-orders", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        order: order,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/service")
  async adminService (@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const services = await this.serviceService.getAllServices();
    if(token) {
      return res.render("admin-service", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        service: services,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/mans")
  async adminMan (@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const mans = await this.manService.getAllMans()
    if(token) {
      return res.render("admin-man", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        man: mans,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/category")
  async adminCategory (@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const categories = await this.categoryService.getAllCategories()
    if(token) {
      return res.render("admin-category", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        category: categories,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/user/:id")
  async editUserForm(@Res() res: Response, @Req() req: Request,
                     @Param("id", ParseIntPipe) id: number) {

    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const user = await this.userService.getUserById(id);
    return res.render("admin-edit-user", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      user: user
    })
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/category/:id")
  async editCategoryForm(@Res() res: Response, @Req() req: Request,
                         @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const category = await this.categoryService.getCategoryById(id);
    console.log(category);
    return res.render("admin-edit-category", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      category: category,
    })
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/service/:id")
  async editServiceForm(@Res() res: Response, @Req() req: Request,
                         @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const service = await this.serviceService.getServiceById(id);
    return res.render("admin-edit-service", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      service: service,
    })
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/man/:id")
  async editManForm(@Res() res: Response, @Req() req: Request,
                        @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const man = await this.manService.getManById(id);
    return res.render("admin-edit-man", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      man: man,
    })
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/ware/:id")
  async editWareForm(@Res() res: Response, @Req() req: Request,
                    @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const ware = await this.wareService.getLotById(id);
    const mans = await this.manService.getAllMans();
    const categories = await this.categoryService.getAllCategories();
    return res.render("admin-edit-ware", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      ware: ware,
      man: mans,
      category: categories,
    })
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/order/:id")
  async editOrderForm(@Res() res: Response, @Req() req: Request,
                     @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const order = await this.orderService.getOrderById(id);
    console.log(order);
    return res.render("admin-edit-order", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      order: order,
    })
  }

}
