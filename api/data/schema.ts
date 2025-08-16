import type { SchemaGenerator } from "@babelcoder/restmock";

const schema: SchemaGenerator = ({ faker }) => {
  const user = {
    generator: () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    }),
    defaultFields: () => ({
      role: "user",
    }),
    files: ["avatar"],
    excludeFields: ["password", "refreshToken"],
  };

  const product = {
    generator: () => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    }),
    files: ["image"],
  };

  const order = {};

  return { user, product, order };
};

export default schema;
