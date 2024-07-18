import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {


  private readonly logger = new Logger('ProductsService');


  onModuleInit() {

    this.$connect();
    // console.log('Database connected');
    this.logger.log('Database connected');


  }



  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    })

    // return createProductDto;
  }

  async findAll(PaginationDto: PaginationDto) {

    const { page, limit } = PaginationDto;

    const totalPages = await this.product.count();

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
