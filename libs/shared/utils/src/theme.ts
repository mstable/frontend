import { mergeDeepRight, pathOr } from 'ramda';

import type { SxProps, Theme } from '@mui/material';

/**
 * Get mixin from the theme.
 * Use "." point separated paths.
 *
 * @param {string} path - mixin path, i.e. "paddings.section"
 * @returns {SxProps} - sx prop mixin
 */
export const getMixin =
  (path: string): SxProps =>
  (theme: Theme) =>
    pathOr({}, path.split('.'), theme.mixins);

/**
 * Get and combine multiple mixins from the theme.
 * Use "." point separated paths.
 * Merge order follows paths input.
 *
 * @param {string[]} paths - mixin paths array, i.e. ["centered", "paddings.section"]
 * @returns {SxProps} - combined sx prop mixin
 */
export const getMixins =
  (paths: string[]): SxProps =>
  (theme: Theme) =>
    paths.reduce(
      (acc, curr) =>
        mergeDeepRight(acc, pathOr({}, curr.split('.'), theme.mixins)),
      {},
    );
