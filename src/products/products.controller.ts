import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //@Post()
  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {

    // return createProductDto;

    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'find_all_products' })
  findAll(@Payload() paginationDto: PaginationDto) {

    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_products' })
  findOne(@Payload('id', ParseIntPipe) id: number) { // { id:1} we have ask like this. we ask it found the property and return it
    return this.productsService.findOne(id);
  }
  //other way to do the same thing, but with less weight
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {


  //    return this.productsService.update(+id, updateProductDto);
  // }
  //@Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  update(
    // @Param('id', ParseIntPipe) id: number,
    // @Body() updateProductDto: UpdateProductDto,
    @Payload() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
