import type { ConfigInFile } from "@babelcoder/restmock";

interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }[];
}

const config: ConfigInFile = {
  port: 3000,
  dataDir: "./api/data",
  mapPaths: [
    {
      path: "/admin/users",
      collection: "users",
      actions: ["list", "read", "delete"],
    },
    {
      path: "/admin/products",
      collection: "products",
      actions: ["list", "read", "create", "update", "delete"],
    },
    { path: "/products", collection: "products", actions: ["list", "read"] },
    {
      path: "/admin/orders",
      collection: "orders",
      actions: ["list", "read"],
    },
    {
      path: "/orders",
      collection: "orders",
      actions: ["create", "read"],
    },
  ],
  extraRoutes: [
    {
      method: "GET",
      path: "/orders",
      handler: (req, res, db) => {
        const orders = db
          .getItems("orders")
          .filter((order) => order.userId === req.user!.id);
        res.status(200).json(orders);
      },
    },
  ],
  middleware: [
    [
      "auth",
      {
        kind: "jwt-cookies",
        accessTokenSecretKey: "secret",
        refreshTokenSecretKey: "secret",
        accessTokenExpiresIn: "50m",
        refreshTokenExpiresIn: "90d",
        payloadFields: ["role"],
        enableAuthFor: [
          { method: "GET", path: "/admin/users" },
          { method: "GET", path: "/admin/users/:id" },
          { method: "DELETE", path: "/admin/users/:id" },
          { method: "GET", path: "/admin/products" },
          { method: "GET", path: "/admin/products/:id" },
          { method: "POST", path: "/admin/products" },
          { method: "PUT", path: "/admin/products/:id" },
          { method: "DELETE", path: "/admin/products/:id" },
          { method: "POST", path: "/orders" },
          { method: "GET", path: "/orders" },
          { method: "GET", path: "/orders/:id" },
          { method: "GET", path: "/admin/orders" },
          { method: "GET", path: "/admin/orders/:id" },
        ],
      },
    ],
    [
      "casl",
      {
        defineAbilitiesFor({ user, can }) {
          if (user.role === "admin") {
            can("manage", "all");
          }

          can("create", "Order");
          can("read", "Order", { userId: user.id });
        },
        checkAbilitiesFor: [
          {
            method: "POST",
            path: "/admin/products",
            handler: ({ can }) => can("create", "Product"),
          },
          {
            method: "PUT",
            path: "/admin/products/:id",
            handler: ({ can }) => can("update", "Product"),
          },
          {
            method: "DELETE",
            path: "/admin/products/:id",
            handler: ({ can }) => can("delete", "Product"),
          },
          {
            method: "POST",
            path: "/admin/products",
            handler: ({ can }) => can("create", "Product"),
          },
          {
            method: "POST",
            path: "/orders",
            handler: ({ can }) => can("create", "Order"),
          },
          {
            method: "GET",
            path: "/orders/:id",
            handler: ({ can, record }) => {
              const order = record as unknown as Order;

              return can("create", { __type: "Order", userId: order.userId });
            },
          },
        ],
      },
    ],
  ],
  hooks: {
    beforeSaveRecord: [
      {
        method: "POST",
        path: "/orders",
        handler: (req, _res, record, { db }) => {
          const order = record as unknown as Order;
          order.userId = req.user!.id;
          order.totalPrice = 0;

          for (const item of order.items) {
            const product = db.getItem(
              "products",
              item.productId,
            ) as Order["items"][number];
            item.price = product.price;
            item.name = product.name;
            item.image = product.image;
            order.totalPrice += item.price * item.quantity;
          }

          order.totalPrice = Number(order.totalPrice.toFixed(2));
        },
      },
    ],
  },
};

export default config;
