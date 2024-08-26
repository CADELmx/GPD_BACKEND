// Sobrescribir JSON.stringify para manejar BigInt
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TemplatesController (e2e)', () => {
  let app: INestApplication;
  let templateId: number;

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

  it('debería crear una plantilla', async () => {
    const response = await request(app.getHttpServer())
      .post('/templates')
      .send({
        state: 'pendiente',
        areaId: 1,
        responsibleId: 1,
        revisedById: 2,
        period: 'mayo - agosto 2024: Ordinario',
      })
      .expect(201);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    templateId = response.body.data.id;
    // console.log('Respuesta de creación:', response.body);
    // console.log('ID de la plantilla creada:', templateId);
  });

  it('debería obtener una plantilla por ID', async () => {
    // console.log('Buscando plantilla con ID:', templateId);

    const response = await request(app.getHttpServer())
      .get(`/templates/?id=${templateId}`)
      .expect(200);

    // console.log('Respuesta de búsqueda:', response.body);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data[0]).toHaveProperty('id', templateId);
  });

  it('debería actualizar una plantilla', async () => {
    const updatedData = {
      state: 'aprobado',
    };

    // console.log(
    //   'Actualizando plantilla con ID:',
    //   templateId,
    //   'con datos:',
    //   updatedData,
    // );

    const response = await request(app.getHttpServer())
      .patch(`/templates/${templateId}`)
      .send(updatedData)
      .expect(200);

    // console.log('Respuesta de actualización:', response.body);

    expect(response.body).toHaveProperty('message', 'Plantilla actualizada');
    expect(response.body).toHaveProperty('error', null);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).not.toBeNull();
    expect(response.body.data).toHaveProperty('state', 'aprobado');
  });

  it('debería eliminar una plantilla', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/templates/${templateId}`)
      .send({ confirmado: true })
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Se eliminó la plantilla');
    // console.log('Respuesta de eliminación:', response.body);
  });
});
