import { DataContext } from "./context";
import Query from "./query";
import { Resolvers } from "./resover-types.generated";

const resolvers: Resolvers<DataContext> = {
  Query,
};

export default resolvers;
