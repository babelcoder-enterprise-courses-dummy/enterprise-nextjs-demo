import type { ConfigInFile } from "@babelcoder/restmock";

interface Order extends Record<string, unknown> {
  id: number;
  userId: number;
  totalPrice: number;
  items: {
    id: number;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }[];
}

const config: ConfigInFile = {
  port: 3210,
  dataDir: "./api/data",
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
  mapPaths: [
    {
      path: "/admin/users",
      collection: "users",
      actions: [{ name: "list", delay: 5_000 }, "read", "delete"],
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
      actions: ["create", "list", { name: "read", delay: 5_000 }],
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
        filterRecordsForUser: [{ method: "GET", path: "/orders" }],
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
          const order = record as Order;
          console.log("order", order);
          console.log("req.user", req.user);
          order.userId = req.user!.id;
          order.totalPrice = 0;

          for (const item of order.items) {
            const product = db.getItem(
              "products",
              item.id,
            ) as Order["items"][number];
            item.price = product.price;
            item.name = product.name;
            item.image = product.image;
            order.totalPrice += item.price * item.quantity;
          }

          order.totalPrice = Number(order.totalPrice.toFixed(2));
          return order;
        },
      },
    ],
  },
};

export default config;
