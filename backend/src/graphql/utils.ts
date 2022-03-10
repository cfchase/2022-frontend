import type { FieldNode, SelectionSetNode } from 'graphql';
import { Kind } from 'graphql';
import { curry, find, flow, some } from 'lodash/fp';

/**
 * Get the selections from a graphql ast for a field with the specified name
 */
export const getFieldSelections = curry(
  (fieldName: string, fieldNodes: ReadonlyArray<FieldNode>) =>
    flow(
      find<FieldNode>({ name: { value: fieldName } }),
      (node) => node?.selectionSet?.selections ?? []
    )(fieldNodes)
);

/**
 * Determines if a field node with the specified name is contained within the selection set of a graphql ast
 */
export const isFieldSelected = curry(
  (fieldName: string, selection: SelectionSetNode['selections']): boolean =>
    some(
      (node) =>
        node.kind === Kind.FIELD || node.kind === Kind.FRAGMENT_SPREAD
          ? node.name.value === fieldName
          : isFieldSelected(fieldName, node.selectionSet.selections),
      selection
    )
);
