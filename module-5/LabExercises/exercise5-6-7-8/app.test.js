const request = require('supertest');
const app = require('./app');

describe('Calculator Routes', () => {
  // Generate test values
  const number1 = Math.floor(Math.random() * 1_000_000);
  const number2 = Math.floor(Math.random() * 1_000_000);

  test('GET /calculator/add => sum of numbers', () => {
    return request(app)
      .get(`/calculator/add?num1=${number1}&num2=${number2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          result: number1 + number2,
        });
      });
  });

  test('GET /calculator/subtract => difference of numbers', () => {
    return request(app)
      .get(`/calculator/subtract?num1=${number1}&num2=${number2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          result: number1 - number2,
        });
      });
  });

  test('GET /calculator/multiply => product of numbers', () => {
    return request(app)
      .get(`/calculator/multiply?num1=${number1}&num2=${number2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          result: number1 * number2,
        });
      });
  });

  test('GET /calculator/divide => quotient of numbers', () => {
    // Avoid divide-by-zero test by ensuring number2 is not 0
    const safeNumber2 = number2 === 0 ? 1 : number2;
    return request(app)
      .get(`/calculator/divide?num1=${number1}&num2=${safeNumber2}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          result: number1 / safeNumber2,
        });
      });
  });
});
