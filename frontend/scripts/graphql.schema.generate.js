const { introspectionFromSchema } = require("graphql");
const { loadSchema } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { stitchSchemas } = require("@graphql-tools/stitch");
const path = require('path');

const fs = require("fs");
const schemas = [
  path.resolve(__dirname, '../../backend/schema.graphqls'),
];

(async function () {
  const subschemas = await Promise.all(
    schemas.map(
      async (schema) =>
        await loadSchema(schema, {
          commentDescriptions: true,
          loaders: [new GraphQLFileLoader()],
        }),
    ),
  );
  const mergedSchema = stitchSchemas({ subschemas });

  const schemaJson = introspectionFromSchema(mergedSchema, {
    descriptions: true,
    schemaDescription: false,
    inputValueDeprecation: false,
    specifiedByUrl: false,
    directiveIsRepeatable: false,
  });

  const filePath = "./schema.json";
  console.log("Write introspection schema to " + filePath);
  fs.writeFileSync(filePath, JSON.stringify({ data: schemaJson }, null, 2), {
    encoding: "utf8",
    flag: "w",
  });
})();
