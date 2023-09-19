import type { CodegenConfig } from "@graphql-codegen/cli";

const config:CodegenConfig = {
    schema: './src/schema.graphql',
    generates: {
        './src/resolvers/resover-types.generated.ts' : {
            config: { useIndexSignature: true },
            plugins: ['typescript', 'typescript-resolvers']
        }
    }
};

export default config;