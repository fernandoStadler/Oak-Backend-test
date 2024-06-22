import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const createdProduct = await this.prismaService.products.create({
        data: createProductDto,
      });
      return JSON.stringify({
        msg: `Produto de código ${createdProduct.productCode} gravado com sucesso!`,
      });
    } catch (error) {
      throw new Error(`Erro ao gravar o produto: ${error.message}`);
    }
  }

  async findAll(orderByPrice: boolean) {
    try {
      const FindAllProducts = await this.prismaService.products.findMany({
        orderBy: orderByPrice ? { productPrice: 'asc' }:{ productPrice: 'desc' },
      });

      if (FindAllProducts.length === 0) {
        throw new NotFoundException('Nenhum produto encontrado.');
      }
      return FindAllProducts;
    } catch (error) {
      throw new Error(`Erro ao buscar os produtos: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const FindUnicProduct = await this.prismaService.products.findUnique({
      where: { id },
    });

    if (!FindUnicProduct) {
      return JSON.stringify({
        msg: `Produto de ${id} não localizado`,
      });
    }
    return FindUnicProduct;
  }


  async getProducts(orderByPrice: boolean) {
    const products = await this.prismaService.products.findMany({
      orderBy: orderByPrice ? { productPrice: 'asc' } : undefined,
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }
    return products;
  }
  

  async update(id: string, updateProductDto: UpdateProductDto) {
    const UpdateProduct = await this.prismaService.products.update({
      where: { id },
      data: updateProductDto,
    });
    if (!UpdateProduct) {
      return JSON.stringify({
        msg: `Usuario de ${id} não localizado`,
      });
    }
    return UpdateProduct;
  }

  async remove(id: string) {
    const existingProduct = await this.prismaService.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return {
        msg: `Produto de ID ${id} não localizado`,
      };
    }
    await this.prismaService.products.delete({
      where: { id },
    });
    return {
      msg: `Produto de código ${existingProduct.productCode} deletado com sucesso!`,
    };
  }
}
