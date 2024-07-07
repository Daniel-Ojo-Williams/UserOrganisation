import app from '../app';
import request from 'supertest';
import { prisma } from '../config';

describe('User Authentication', () => {
  let token: string;
  let userId: string;
  let orgId: string;
  const userPayload = { firstName: 'Test name', lastName: 'Test name', email: 'test@gmail.com', password: '12345' };

  afterAll(async () => {
    const removeOrg = prisma.user.update({
      where: { userId },
      data: {
        organisations: { deleteMany: {} }
      }
    })
    const removeUser = prisma.user.delete({ where: { userId } });
    await prisma.$transaction([removeOrg, removeUser])
  });
  
  it('Should register user successfully with default organisation', async () => {
    const res = await request(app).post('/auth/register').send(userPayload);
    userId = res.body?.data.user.userId;
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('lastName', 'Test name');
    expect(res.body.data.user).toHaveProperty('firstName', 'Test name');

    token = res.body.data.accessToken;

    // --| Get user deafult organisation
    const resp = await request(app).get('/api/organisations').auth(token, { type: 'bearer' });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty('data');
    expect(resp.body.data).toHaveProperty('organisations');
    expect(Array.isArray(resp.body.data.organisations)).toBeTruthy();
    expect(resp.body.data.organisations.length).toBeTruthy()
    expect(resp.body.data.organisations[0]).toHaveProperty('name', 'Test name\'s organisation')
  });

  it('Should log the user in successfully', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'test@gmail.com', password: '12345' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('lastName', 'Test name');
    expect(res.body.data.user).toHaveProperty('userId', userId);
    expect(res.body.data.user).toHaveProperty('firstName', 'Test name');
  });

  it('Should fail if fields are missing on register', async () => {
    const res = await request(app).post('/auth/register').send({ firstName: 'Test name', lastName: 'Test name', password: '12345' });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBeTruthy();
    expect(res.body.errors[0]).toHaveProperty('path', 'email');
    expect(res.body.errors[0]).toHaveProperty('message', 'Email is required');
  });

  it('Should fail if there is duplicate email', async () => {
    const res = await request(app).post('/auth/register').send(userPayload);

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('message', 'An account with this email already exists');
    expect(res.body).toHaveProperty('status', 'Conflict')
  });
});