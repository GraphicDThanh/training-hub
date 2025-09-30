import faker from 'faker';

export const generateListProduct = (numberOfRecords) => {
  let products = [];

  if (numberOfRecords) {
    for(let i = 0; i < numberOfRecords; i ++) {
      products = [...products, {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.technics()
      }];
    }
  }

  return products;
}

export const generateSingleProduct = () => {
  return {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.technics()
  };
}