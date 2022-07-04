import {
  capitalize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography as MuiTypography,
  useTheme,
} from '@mui/material';

import { fontWeights } from '../constants';

export default {
  title: 'Theme/Typography',
};

const sample = 'The DeFi yield operating system';

const formatFontweight = (w: number) =>
  capitalize(
    Object.keys(fontWeights).reduce(
      (acc, curr) => (fontWeights[curr] === w ? curr : acc),
      w.toString(),
    ),
  );

export const Typography = () => {
  const { typography } = useTheme();

  if (!typography || Object.keys(typography).length === 0) {
    return null;
  }

  const variantKeys = Object.keys(typography).filter((k) =>
    [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'body1',
      'body2',
      'buttonSmall',
      'buttonMedium',
      'buttonLarge',
      'label1',
      'label2',
      'placeholder',
      'hint',
      'value1',
      'value2',
      'value3',
      'value4',
      'value5',
      'value6',
    ].includes(k),
  );

  return (
    <TableContainer sx={{ width: 1, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Font Weight</TableCell>
            <TableCell>Font Size</TableCell>
            <TableCell>Text Transform</TableCell>
            <TableCell>Line Height</TableCell>
            <TableCell>Sample</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variantKeys.map((key) => (
            <TableRow key={key}>
              <TableCell sx={typography[key]}>{key}</TableCell>
              <TableCell>
                {formatFontweight(typography[key].fontWeight)}
              </TableCell>
              <TableCell>{typography[key].fontSize}px</TableCell>
              <TableCell>{typography[key].textTransform ?? ''}</TableCell>
              <TableCell>{typography[key].lineHeight}</TableCell>
              <TableCell>
                <MuiTypography sx={typography[key]}>{sample}</MuiTypography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
