import React from 'react';

import JSONView from 'react-json-view';

import type { ReactJsonViewProps } from 'react-json-view';

interface JsonViewProps extends Omit<ReactJsonViewProps, 'theme'> {
  jsonViewTheme: string;
}

export const JsonView = ({ jsonViewTheme, ...props }: JsonViewProps) => (
  <JSONView
    name={false}
    displayDataTypes={false}
    enableClipboard={true}
    displayObjectSize={false}
    collapsed={2}
    collapseStringsAfterLength={25}
    theme={jsonViewTheme === 'dark' ? 'tomorrow' : 'rjv-default'}
    style={{ backgroundColor: 'transparent' }}
    {...props}
  />
);
