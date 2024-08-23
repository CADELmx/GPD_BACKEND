import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('TemplatesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/templates (GET) - should return all templates', () => {
    return request(app.getHttpServer())
      .get('/templates')
      .expect(200)
      .expect((response) => {
        expect(response.body.message).toBe('Plantillas obtenidas con exito');
        expect(Array.isArray(response.body.data)).toBeTruthy();
      });
  });

  it('/templates/:id (GET) - should return a single template', () => {
    return request(app.getHttpServer())
      .get('/templates/1')
      .expect(200)
      .expect((response) => {
        expect(response.body.message).toBe('Plantillas obtenidas con éxito');
        expect(response.body.data.length).toBeGreaterThan(0);
      });
  });

  it('/templates (POST) - should create a new template', () => {
    const createTemplateDto = {
      state: 'pendiente',
      areaId: 1,
      period: 'mayo - agosto 2024: Ordinario',
      responsibleId: 1,
      revisedById: 2,
      // otros campos necesarios
    };

    return request(app.getHttpServer())
      .post('/templates')
      .send(createTemplateDto)
      .expect(201)
      .expect((response) => {
        expect(response.body.message).toBe('Plantilla registrada');
        expect(response.body.data).toHaveProperty('id');
      });
  });

  it('/templates/:id (PATCH) - should update a template', () => {
    const updateTemplateDto = {
      areaId: 2,
      responsibleId: 1,
      revisedById: 2,
      // otros campos necesarios
    };

    return request(app.getHttpServer())
      .patch('/templates/1')
      .send(updateTemplateDto)
      .expect(200)
      .expect((response) => {
        expect(response.body.message).toBe('Plantilla actualizada');
      });
  });

  it('/templates/:id (DELETE) - should delete a template', () => {
    return request(app.getHttpServer())
      .delete('/templates/1')
      .expect(200)
      .expect((response) => {
        expect(response.body.message).toBe('Se eliminó la plantilla');
      });
  });
});
