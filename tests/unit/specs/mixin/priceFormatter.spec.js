import priceFormatter from '@/mixins/priceFormatter';

describe('priceFormat mixin', () => {
  it('calculates price amount with 2 fraction digits', () => {
    const price = { centAmount: 1275, fractionDigits: 2 };
    expect(priceFormatter.methods.calculatePriceAmount(price)).toBe(12.75);
  });

  it('calculates price amount with 1 fraction digit', () => {
    const price = { centAmount: 1275, fractionDigits: 1 };
    expect(priceFormatter.methods.calculatePriceAmount(price)).toBe(127.5);
  });

  it('calculates price amount with 0 fraction digits', () => {
    const price = { centAmount: 1275, fractionDigits: 0 };
    expect(priceFormatter.methods.calculatePriceAmount(price)).toBe(1275);
  });
});
