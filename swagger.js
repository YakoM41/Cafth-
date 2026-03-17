const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SIO2426 CafThé API",
      description: "API pour site CafThé (site e-commerce)",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Developpement",
      },
    ],
    components: {
      schema: {
        Pokemon: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Erreur serveur" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
