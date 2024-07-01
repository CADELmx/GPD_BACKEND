import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';
import { PrismaService } from 'src/prisma.service';
import { EducationalPrograms, Prisma } from '@prisma/client';

@Injectable()
export class EducationalProgramsService {

  constructor(private prisma: PrismaService) {}

/**
 * Method for creating a new educational program.
 * @param data Program data to register
 * @returns Registered Educational Program
 */
  async createProg(data: Prisma.EducationalProgramsCreateInput): Promise<EducationalPrograms> {
   return this.prisma.educationalPrograms.create({
    data,
   })
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
    `This action updates a #${id} educationalProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} educationalProgram`;
  }
}
