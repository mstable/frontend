/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from 'react';

import type { ReactNode } from 'react';

/**
 * Compose all contexts into one component.
 * This is an equivalent to nesting jsx element, it simply helps readabilty.
 * Pass ContextProvider as first array element, optional props as second.
 * Merge order follows paths input.
 *
 * @param contexts - [Context, props] arrays for composition
 * @param Child - Child element
 * @returns ContextProvider
 */
export const composeContexts: (
  contexts: [any, any?][],
  Child: ReactNode,
) => any = (contexts, Child) =>
  contexts.reduceRight(
    (children, [Component, props]) => createElement(Component, props, children),
    Child,
  );
