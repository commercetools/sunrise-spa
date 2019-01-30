import priceMixin from '@/mixins/priceMixin';

describe('priceFormat', () => {
  it.skip('calculates price amount with 2 fraction digits', () => {
    const price = { centAmount: 1275, fractionDigits: 2 };
    expect(priceMixin.methods.calculatePriceAmount(price)).toBe(12.75);
  });

  it.skip('calculates price amount with 1 fraction digit', () => {
    const price = { centAmount: 1275, fractionDigits: 1 };
    expect(priceMixin.methods.calculatePriceAmount(price)).toBe(127.5);
  });

  it.skip('calculates price amount with 0 fraction digits', () => {
    const price = { centAmount: 1275, fractionDigits: 0 };
    expect(priceMixin.methods.calculatePriceAmount(price)).toBe(1275);
  });
});
