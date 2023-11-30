export class CreateOrderDto {
  description: string;
  status: string;

  user;
  ware?;
  service?;
}