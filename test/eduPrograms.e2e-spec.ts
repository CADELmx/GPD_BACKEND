import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
//import * as dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env.test
//dotenv.config({ path: '.env.test' });

describe('EducationalProgramsController (e2e)', () => {
  let app: INestApplication;
  let programId: number; // Variable para almacenar el ID del programa educativo

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('debería crear un programa educativo', async () => {
    const response = await request(app.getHttpServer())
      .post('/educational-programs')
      .send({
        abbreviation: 'RIC',
        description: 'Redes Infraest5ructura Inteligente',
        areaId: 1,
      })
      .expect(201);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
    programId = response.body.data.id;
    //console.log(response.body.data)
  });

  it('debería obtener un programa educativo por ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/educational-programs/${programId}`) 
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id', programId);
   // console.log(programId)
  });

  it('debería actualizar un programa educativo', async () => {
    const updatedData = {
      abbreviation: 'CS102',
      description: 'Curso Avanzado de Ciencia de la Computación',
      areaId: 1,
    };

    const response = await request(app.getHttpServer())
      .patch(`/educational-programs/${programId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('abbreviation', 'CS102');
    expect(response.body.data).toHaveProperty('description', 'Curso Avanzado de Ciencia de la Computación');

  });

  it('debería eliminar un programa educativo', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/educational-programs/${programId}`)
      .send({ confirmado: true })  
      .expect(200);
  
    expect(response.body).toHaveProperty('message', 'Programa educativo eliminado con éxito');
  });
  
});

