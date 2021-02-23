import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Nota } from 'src/interface/nota.interface';

let authToken: string;
let authToken2: string;
let notas: Nota[] = []

describe('AppController (e2e)', () => {

  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  });

  it('/usuarios/registro: REGISTRO USUARIO #1', () => {
    return request(app.getHttpServer())
      .post('/usuarios/registro')
      .expect(201)
      .send({
        "usuario": "usuario",
        "clave": "1234"
      })
  })

  it('/usuarios/registro: REGISTRO USUARIO #2', () => {
    return request(app.getHttpServer())
      .post('/usuarios/registro')
      .expect(201)
      .send({
        "usuario": "usuario2",
        "clave": "1234"
      })
  })
  it('/usuarios/registro: RECHAZAR USUARIO DUPLICADO', () => {
    return request(app.getHttpServer())
      .post('/usuarios/registro')
      .expect(406)
      .send({
        "usuario": "usuario2",
        "clave": "1234"
      })
  })

  it('/usuarios/login: USUARIO NO EXISTE', () => {
    return request(app.getHttpServer())
      .post('/usuarios/login')
      .expect(401)
      .send({
        usuario: "usuario3",
        clave: "1234"
      })
  })
  it('/usuarios/login LOGIN USUARIO #1', (done) => {
    return request(app.getHttpServer())
      .post('/usuarios/login')
      .expect(201)
      .send({
        usuario: "usuario",
        clave: "1234"
      }).end((err, res) => {
        if (err) return done(err);
        authToken = `Bearer ${res.body.token}`
        done();
      })
  })
  it('/usuarios/login LOGIN USUARIO #2', (done) => {
    return request(app.getHttpServer())
      .post('/usuarios/login')
      .expect(201)
      .send({
        usuario: "usuario2",
        clave: "1234"
      }).end((err, res) => {
        if (err) return done(err);
        authToken2 = `Bearer ${res.body.token}`
        done();
      })
  })

  it('/notas/crear: CREAR NOTA #1 USUARIO #1', () => {
    return request(app.getHttpServer())
      .post('/notas/crear')
      .set('authorization', authToken)
      .expect(201)
      .send({
        nota: "Esta es mi primera nota, y no es mi favorita ahora, pero lo será.",
        favorita: false
      })
  })
  it('/notas/crear: CREAR NOTA #2 USUARIO #1', () => {
    return request(app.getHttpServer())
      .post('/notas/crear')
      .set('authorization', authToken)
      .expect(201)
      .send({
        nota: "Esta es mi segunda nota, y tampoco es mi favorita",
        favorita: false
      })
  })
  it('/notas/crear: CREAR NOTA #3 USUARIO #1', () => {
    return request(app.getHttpServer())
      .post('/notas/crear')
      .set('authorization', authToken)
      .expect(201)
      .send({
        nota: "Esta es mi tercera nota, y esta si es mi favorita",
        favorita: true
      })
  })
  it('/notas/crear: CREAR NOTA #1 USUARIO #2', () => {
    return request(app.getHttpServer())
      .post('/notas/crear')
      .set('authorization', authToken2)
      .expect(201)
      .send({
        nota: "Esta es mi tercera nota, y esta si es mi favorita",
        favorita: true
      })
  })

  it('/notas/usuario MIS NOTAS', done => {
    return request(app.getHttpServer())
      .get('/notas/usuario')
      .set('authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(3);
        notas = res.body;
        done();
      })
  })

  it('/notas/favoritos: HAY 1 NOTA FAVORITA', done => {
    return request(app.getHttpServer())
      .get('/notas/favoritos')
      .set('authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(1)
        done();
      })
  })
  it('/notas/favorito: MARCAR 1era NOTA COMO FAVORITA', done => {
    return request(app.getHttpServer())
      .post('/notas/favorito')
      .set('authorization', authToken)
      .send({
        notaId: notas[0].id,
        favorita: true
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      })
  })
  it('/notas/favoritos: HAY 2 NOTAS FAVORITA', done => {
    return request(app.getHttpServer())
      .get('/notas/favoritos')
      .set('authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(2);
        done();
      })
  })

  it('/notas/nota BUSCAR NOTA #2', (done) => {
    return request(app.getHttpServer())
      .get(`/notas/nota?notaId=${notas[1].id}`)
      .set('authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('nota', 'Esta es mi segunda nota, y tampoco es mi favorita')
        done();
      })
  })

  it('/notas: LEER TODAS LAS NOTAS ( HAY 4 EN TOTAL)', (done) => {
    return request(app.getHttpServer())
      .get('/notas')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(4);
        done();
      })
  })


});
