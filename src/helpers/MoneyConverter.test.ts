import MoneyConverter from './MoneyConverter';

test('if convert to double with rate 2', () => {
  expect(MoneyConverter.convert(10, 2)).toEqual(20);
});

test('if convert to half with rate 2 in reverse', () => {
  expect(MoneyConverter.convert(10, 2, { inverse: true })).toEqual(5);
});
