import { DataContext } from "./context";
import Query from "./query";
import { Resolvers } from "./resolver-types.generated";

const resolvers: Resolvers<DataContext> = {
  Query,
};

export default resolvers;
