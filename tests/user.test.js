const request = require('supertest');
const app = require('../server');
app.listen(3000);

describe('POST /api/user/', () => {
  it('creates a new user successfully', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        firstname: 'Hossein',
        lastname: 'Shaemi',
        email: 'hoseinshaemi@gmail.com',
        password: 'Test1234!@#',
        phonenumber: '09135482550',
      })
      .expect(200);

    expect(res.body.successfull).toBe(true);
    expect(res.body.message).toBe('ثبت نام موفقیت آمیز بود');
  });

  it('creates a new user unsuccessfully', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        firstname: 'Hossein',
        lastname: 'Shaemi',
        email: 'hoseinshaemi1394@gmail.com',
        password: 'test',
        phonenumber: '09132582550',
      })
      .expect(422);

    expect(res.body.successfull).toBe(false);
    expect(res.body.message[0]).toBe('پسورد باید حداقل دارای یک حرف خاص باشد');
    expect(res.body.message[1]).toBe('پسورد باید حداقل دارای یک حرف بزرگ باشد');
  });

  it('login user successfully', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: 'hoseinshaemi1393@gmail.com',
        password: 'Test1234!@#',
      })
      .expect(200);

    expect(res.body.successfull).toBe(true);
    expect(res.body.message).toBe('ورود موفقیت آمیز بود');
  });

});
