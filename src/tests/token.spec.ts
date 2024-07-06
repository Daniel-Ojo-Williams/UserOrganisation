import { decodeToken, genToken } from '../utils';



describe('Token Tests', () => {
  type payload = { name: string, email: string, [index: string]: string };
  const payload: payload = { name: 'Test name', email: 'Test email' };
  const expiresIn = '5h';
  const token = genToken(payload, expiresIn);

  test('TokenExpiredError', () => {
    // --| jsonwebtoken uses the underlying Date Object to verify tokens, as such, manipulating the Date Object would affect the result by jsonwebtoken when verifying
    // --| Move the system time by 10 hours (simulates 10hours has gone by after setting the token)
    jest.useFakeTimers().advanceTimersByTime(10 * 60 * 60 * 1000);
    const currentDate = Date.now();
    jest.setSystemTime(currentDate);
    
    expect(() => {
      const result = decodeToken(token);
      console.log(result);
    }).toThrow('jwt expired');

    jest.useRealTimers();
  });

  test('Correct user details is found in token', () => {
    const result = decodeToken<payload>(token);
    // --| Checks if every property in the original payload is present in the decoded payload
    expect(Object.keys(payload).every(key => payload[key] === result[key])).toBeTruthy();
  })
});