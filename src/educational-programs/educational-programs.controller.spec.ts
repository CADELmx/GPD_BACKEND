import { Test, TestingModule } from '@nestjs/testing';
import { EducationalProgramsController } from './educational-programs.controller';
import { EducationalProgramsService } from './educational-programs.service';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { NotFoundException } from '@nestjs/common';

describe('EducationalProgramsController', () => {
  let controller: EducationalProgramsController;
  let service: EducationalProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalProgramsController],
      providers: [EducationalProgramsService, PrismaService, PrismaErrorHandler],
    }).compile();

    controller = module.get<EducationalProgramsController>(EducationalProgramsController);
    service = module.get<EducationalProgramsService>(EducationalProgramsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProgram', () => {
    it('Debe crear un programa educativo', async () => {
      const createEducationalProgramDto: CreateEducationalProgramDto = {
        abbreviation: 'LI',
        description: 'Lengua Inglesa',
        areaId: BigInt(1), // BigInt aquí
      };

      const result = {
        message: 'Programa educativo creado con éxito',
        error: '',
        data: {
          id: BigInt(1), // Simula el ID como BigInt
          abbreviation: 'LI',
          description: 'Lengua Inglesa',
          areaId: BigInt(1),
        },
      };

      // Mock del servicio
      jest.spyOn(service, 'createProgram').mockImplementation(async () => result);

      // Llamada al controlador
      const response = await controller.create(createEducationalProgramDto);

      // Convertir todos los BigInt a string para evitar errores de serialización
      const serializedResponse = {
        ...response,
        data: {
          ...response.data,
          id: response.data.id.toString(),
          areaId: response.data.areaId.toString(),
        },
      };

      const serializedResult = {
        ...result,
        data: {
          ...result.data,
          id: result.data.id.toString(),
          areaId: result.data.areaId.toString(),
        },
      };

      // Mostrar el resultado en consola
      console.log('Create Program Response:', serializedResponse);

      // Comparar las respuestas
      expect(serializedResponse).toEqual(serializedResult);
    });
  });

  describe('findProgramById', () => {
    it('Debe traer un programa educativo por ID', async () => {
      const result = {
        message: 'Programa educativo encontrado',
        error: '',
        data: {
          id: BigInt(20),  // BigInt en el resultado
          abbreviation: 'DGS',
          description: 'Desarrollo y Gestion de software',
          areaId: BigInt(1),  // Usar número si el DTO espera un número
        },
      };

      jest.spyOn(service, 'findProgramById').mockImplementation(async () => result);

      const response = await controller.findById('20');

      const serializedResponse = {
        ...response,
        data: {
          ...response.data,
          id: response.data.id.toString(),
          areaId: response.data.areaId.toString(),
        },
      };

      const serializedResult = {
        ...result,
        data: {
          ...result.data,
          id: result.data.id.toString(),
          areaId: result.data.areaId.toString(),
        },
      };

      console.log('Find Program by ID Response:', serializedResponse);

      expect(serializedResponse).toEqual(serializedResult);
    });

    it('Debe manejar el caso en que no se encuentre el programa educativo por ID', async () => {
      const notFoundResult = {
        statusCode: 404,
        message: 'Programa educativo no encontrado',
        error: 'Not Found',
      };

      jest.spyOn(service, 'findProgramById').mockImplementation(async () => {
        throw new NotFoundException(notFoundResult.message);
      });

      try {
        await controller.findById('20');  // ID que no existe
      } catch (error) {
        const errorResponse = {
          statusCode: error.response.statusCode,
          message: error.response.message,
          error: error.response.error,
        };

        console.log('Find Program by ID Error Response:', errorResponse);

        expect(errorResponse).toEqual(notFoundResult);
      }
    });
  });
});
