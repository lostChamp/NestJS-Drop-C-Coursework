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

@Roles("ADMIN")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {

  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService,
              private readonly wareService: LotService,
              private readonly orderService: OrderService,
              private readonly serviceService: ServiceService,
              private readonly manService: ManufacturerService,
              private readonly categoryService: CategoryService) {}

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

  @Get("/user/create")
  async createUserForm(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("admin-add-user", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
    })
  }

  @Get("/ware/create")
  async createWareForm(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const mans = await this.manService.getAllMans();
    const categories = await this.categoryService.getAllCategories();
    return res.render("admin-add-ware", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      man: mans,
      category: categories,
    })
  }

  @Get("/service/create")
  async createServiceForm(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("admin-add-service", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
    })
  }

  @Get("/man/create")
  async createManForm(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("admin-add-man", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
    })
  }

  @Get("/category/create")
  async createCategoryForm(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("admin-add-category", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
    })
  }

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

  @Get("/category/:id")
  async editCategoryForm(@Res() res: Response, @Req() req: Request,
                         @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const category = await this.categoryService.getCategoryById(id);
    return res.render("admin-edit-category", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      category: category,
    })
  }

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

  @Get("/order/:id")
  async editOrderForm(@Res() res: Response, @Req() req: Request,
                     @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const order = await this.orderService.getOrderById(id);
    return res.render("admin-edit-order", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      order: order,
    })
  }

}
