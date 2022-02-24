import type { ModulesConfig } from '@graphql-codegen/graphql-modules-preset/config';
import type { NearOperationFileConfig } from '@graphql-codegen/near-operation-file-preset';
import type { Types as CodegenTypes } from '@graphql-codegen/plugin-helpers';
import type { TypeScriptTypedDocumentNodesConfig } from '@graphql-codegen/typed-document-node';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';
import type { IGraphQLConfig } from 'graphql-config';

type BackendConfig = TypeScriptPluginConfig & TypeScriptResolversPluginConfig;

type FrontendConfig = TypeScriptPluginConfig &
  TypeScriptDocumentsPluginConfig &
  TypeScriptTypedDocumentNodesConfig;

// Give intellisense to inline object(s)
const ident = <T>(value: T): T => value;

const graphqlModulesPath = 'backend/src/graphql/modules/';
const graphqlExtension = '{gql,graphql}';
const graphqlSchema = `${graphqlModulesPath}**/*.${graphqlExtension}` as const;

const frontendSrcPath = 'frontend/src/';
const frontendSchemaFile = 'schema.ts';
const frontendSchemaPath = `${frontendSrcPath}${frontendSchemaFile}` as const;

const graphqlConfig: IGraphQLConfig = {
  projects: {
    backend: {
      schema: graphqlSchema,
      extensions: {
        codegen: ident<CodegenTypes.Config>({
          config: ident<BackendConfig>({
            optionalResolveType: true, // make `__resolveType` field optional
            useIndexSignature: true, // required for compatibility with apollo server
          }),
          generates: ident({
            [graphqlModulesPath]: {
              preset: 'graphql-modules',
              presetConfig: ident<ModulesConfig>({
                baseTypesPath: 'generated.types.ts',
                encapsulateModuleTypes: 'none',
                filename: 'generated.types.ts',
                useGraphQLModules: false,
              }),
              plugins: ['typescript', 'typescript-resolvers'],
            },
          }),
        }),
      },
    },
    frontend: {
      schema: [
        graphqlSchema,
        `${frontendSrcPath}client.schema.${graphqlExtension}`,
      ],
      documents: `${frontendSrcPath}components/**/*.${graphqlExtension}`,
      extensions: {
        codegen: ident<CodegenTypes.Config>({
          config: ident<FrontendConfig>({
            constEnums: true, // use `const enum` to define unions
            declarationKind: 'interface', // use `interface` keyword to define types
            immutableTypes: true, // add `readonly` keyword to frozen objects
            namingConvention: 'keep', // don't rename types
            dedupeOperationSuffix: true, // prevent `MyQueryQuery`
            documentVariableSuffix: '', // export `MyQuery` instead of `MyQueryDocument`
            operationResultSuffix: 'Data', // add `Data` suffix to result types
          }),
          generates: ident({
            [frontendSchemaPath]: {
              plugins: ['typescript'],
            },
            [frontendSrcPath]: {
              preset: 'near-operation-file',
              presetConfig: ident<NearOperationFileConfig>({
                baseTypesPath: frontendSchemaFile,
                extension: '.graphql.ts',
              }),
              plugins: ['typescript-operations', 'typed-document-node'],
            },
          }),
        }),
      },
    },
  },
};

export default graphqlConfig;
