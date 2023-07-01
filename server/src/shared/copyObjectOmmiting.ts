export const copyOmmiting = (obj: any, ...ommit: string[]) => {
  const copy = Object.assign({}, obj);
  ommit.forEach((property) => delete copy[property]);
  return copy;
};
