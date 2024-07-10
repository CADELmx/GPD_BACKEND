import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';
import { PrismaService } from 'src/prisma.service';
import { EducationalPrograms, Prisma } from '@prisma/client';
import { promises } from 'dns';


@Injectable()
export class EducationalProgramsService {

  constructor(private prisma: PrismaService) {}

/**
 * Method for creating a new educational program.
 * @param data Program data to register
 * @returns Registered Educational Program
 */
async create(educationalProgram: CreateEducationalProgramDto): Promise <{ message: string | null; error: { message: string } | null; data: EducationalPrograms | null }> {
  try {
  await this.validateForeignKeys(educationalProgram);
  const newPartialTemplate = await this.prisma.educationalPrograms.create({
    data: {
      ...educationalProgram,
    },
    });

  return { message: 'Listo, enviado', error: null, data: newPartialTemplate};
} catch (error) {
  return { message: 'Error al enviar', error: error.message , data: null };
    }
 }

  /**
   * Method to consult all programs
   * @returns Returns all registered educational programs
   */
  async findAll(): Promise<EducationalPrograms[]> {
    return await this.prisma.educationalPrograms.findMany();
  }

  /**
   * Method to query a programs from the id
   * @param id id of the program to consult
   * @returns Returns the program with the corresponding id
   */

  async byId(id: number): Promise<EducationalPrograms> {
    const edu_project= await this.prisma.educationalPrograms.findUnique({
      where:{
        id,
      },
    });

    if(!edu_project){
      throw new NotFoundException (`Educational program not found`)
    }
    return edu_project;
  }

  /**
   * Method to update a program using its id
   * @param id id of the program to update
   * @param updateEducationalProgramDto Program data to update
   * @returns Returns the updated program
   */

  async update(id: number, updateEducationalProgramDto: UpdateEducationalProgramDto,): Promise<EducationalPrograms> {
    await this.byId(id);
    return await this.prisma.educationalPrograms.update({data: {...updateEducationalProgramDto}as any, where: { id},
    });
  
  }
  
/**
 * *Method to delete a program
 * @param id id of the program to delete
 * @returns Return a message after deleting a program
 */

 async remove(id: number): Promise<{ message: string }> {
  await this.byId(id);
  await this.prisma.educationalPrograms.delete({
    where: {
      id
    }
  });
  return { message: 'Deleted successfully' };
  }

/**
   * Validates if foreign keys (areaId, responsibleId, revisedById)
   * @param {CreateEducationalProgramDto | UpdateEducationalProgramDto} dto - Data to validate
   * @throws {NotFoundException} - If any foreign keys is not found
   */
private async validateForeignKeys(
  dto: CreateEducationalProgramDto | UpdateEducationalProgramDto,
): Promise<void> {
  const { areaId } = dto;
  const validations = [];

  if (areaId !== undefined) {
    if (typeof areaId !== 'number') {
      throw new Error(`Tipo de areaId inválido: se esperaba un número, se recibió ${typeof areaId}`);
    }
    validations.push(
      this.prisma.area.count({ where: { id: areaId } }).then((count) => {
        if (count === 0) {
          throw new NotFoundException(`Área con ID ${areaId} no encontrada`);
        }
      }),
    );
  }

  await Promise.all(validations);
}
}
