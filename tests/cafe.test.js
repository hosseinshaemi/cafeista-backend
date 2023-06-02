const request = require('supertest');
const app = require('../server');
app.listen(3001);

describe('POST /api/cafe', () => {
  it('create a cafe successfully', async () => {
    const res = await request(app)
      .post('/api/cafe/register')
      .send({
        firstname: 'Amir',
        lastname: 'Fathi',
        email: 'f.amirhosssein81@gmail.com',
        password: 'Test1234!@',
        phonenumber: '09132546127',
      })
      .expect(200);

    expect(res.body.successfull).toBe(true);
    expect(res.body.message).toBe('کد تایید برای شما ارسال شد');
  });

  it('create a cafe unsuccessfully', async () => {
    const res = await request(app)
      .post('/api/cafe/register')
      .send({
        firstname: 'Amir',
        lastname: 'Fahti',
        email: 'f.amirhosssein811@gmail.com',
        password: 'test',
        phonenumber: '09132646127',
      })
      .expect(422);

    expect(res.body.successfull).toBe(false);
    expect(res.body.message[0]).toBe('پسورد باید حداقل دارای یک حرف خاص باشد');
    expect(res.body.message[1]).toBe('پسورد باید حداقل دارای یک حرف بزرگ باشد');
    expect(res.body.message[2]).toBe('پسورد باید حداقل شامل یک عدد باشد');
  });

  it('login a cafe', async () => {
    const res = await request(app)
      .post('/api/cafe/login')
      .send({
        email: 'hoseinshaemi1393@gmail.com',
        password: 'Test1234!@#',
      })
      .expect(200);

    expect(res.body.successfull).toBe(true);
    expect(res.body.message).toBe('ورود موفقیت آمیز بود');
  });
});
