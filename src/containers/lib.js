import config from '../../sunrise.config';

export const getAttributeValue = (attribute, locale) => {
  if (
    typeof attribute === 'object' &&
    typeof attribute?.label === 'string'
  ) {
    return attribute.label;
  }
  if (
    typeof attribute === 'object' &&
    typeof attribute?.[locale] === 'string'
  ) {
    return attribute?.[locale];
  }
  if (
    typeof attribute === 'object' &&
    typeof attribute?.label === 'object' &&
    typeof attribute?.label?.[locale] === 'string'
  ) {
    return attribute?.label?.[locale];
  }
  return attribute;
};
const arrayToString = (value) =>
  Array.isArray(value) ? value.join(', ') : value;
export function productAttributes(attributes, locale) {
  return config.detailAttributes
    .map(({ name: n, label }) => {
      const value = attributes.find(
        ([name]) => name === n
      )?.[1];
      return value ? [label[locale], value] : false;
    })
    .filter((x) => x)
    .map(([name, value]) => ({
      name,
      value: arrayToString(value),
    }));
}
