import type { CodegenConfig } from "@graphql-codegen/cli";

const config:CodegenConfig = {
    schema: './src/server/schema.graphql',
    documents: ["src/**/*.tsx", "src/**/*.ts"],
    generates: {
        './src/server/resolvers/resolver-types.generated.ts' : {
            config: { useIndexSignature: true },
            plugins: ['typescript', 'typescript-resolvers']
        },
        './src/client/gql/' : {
            preset:'client'
        },
        './src/client/gql/operations.generated.ts' : {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
        }
    }
};

export default config;