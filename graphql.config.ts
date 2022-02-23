import type { ModulesConfig } from '@graphql-codegen/graphql-modules-preset/config';
import type { NearOperationFileConfig } from '@graphql-codegen/near-operation-file-preset';
import type { Types as CodegenTypes } from '@graphql-codegen/plugin-helpers';
import type { TypeScriptTypedDocumentNodesConfig } from '@graphql-codegen/typed-document-node';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';
import type { IGraphQLConfig } from 'graphql-config';

type CodegenConfig = TypeScriptPluginConfig &
  TypeScriptDocumentsPluginConfig &
  TypeScriptResolversPluginConfig &
  TypeScriptTypedDocumentNodesConfig;

// Give intellisense to inline object(s)
const ident = <T>(value: T): T => value;

const graphqlExtension = '{gql,graphql}';
const graphqlModulesPath = 'backend/src/graphql/modules/';
const frontendSrcPath = 'frontend/src/';
const frontendSchemaFile = 'schema.ts';
const frontendSchemaPath = `${frontendSrcPath}${frontendSchemaFile}` as const;
const frontendGraphqlSchema = `${frontendSrcPath}client.schema.${graphqlExtension}` as const;
const frontendDocuments = `${frontendSrcPath}components/**/*.${graphqlExtension}` as const;

const graphqlConfig: IGraphQLConfig = {
  schema: `${graphqlModulesPath}**/*.${graphqlExtension}`,
  extensions: {
    codegen: ident<CodegenTypes.Config>({
      config: ident<CodegenConfig>({
        constEnums: true, // use `const enum` to define unions
        declarationKind: 'interface', // use `interface` keyword to define types
        immutableTypes: true, // add `readonly` keyword to frozen objects
        namingConvention: 'keep', // don't rename types
        dedupeOperationSuffix: true, // prevent `MyQueryQuery`
        documentVariableSuffix: '', // export `MyQuery` instead of `MyQueryDocument`
        operationResultSuffix: 'Data', // add `Data` suffix to result types
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
        [frontendSchemaPath]: {
          schema: frontendGraphqlSchema,
          documents: frontendDocuments,
          plugins: ['typescript'],
        },
        [frontendSrcPath]: {
          schema: frontendGraphqlSchema,
          documents: frontendDocuments,
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
};

export default graphqlConfig;
