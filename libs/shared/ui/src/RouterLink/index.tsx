import { forwardRef } from 'react';

import { Link } from '@tanstack/react-location';

import type { LinkProps } from '@tanstack/react-location';

export const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link _ref={ref} {...props} />,
);
RouterLink.displayName = 'RouterLink';
