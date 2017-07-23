import { GraphQLScalarType, Kind } from "graphql";

export const Date = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value: number) {
    return new global.Date(value);
  },
  serialize(value: Date) {
    return value.getTime();
  },
  parseLiteral(ast) {
    return (
      ast.kind === Kind.INT ?
        parseInt(ast.value, 10) :
        null
    );
  },
});
