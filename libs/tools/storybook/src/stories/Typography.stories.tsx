import {
  Box,
  capitalize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

export default {
  title: 'Theme/Typography',
  component: Typography,
};

const sample = 'The DeFi yield operating system';

const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

const formatFontweight = (w: number) =>
  capitalize(
    Object.keys(fontWeights).reduce(
      (acc, curr) => (fontWeights[curr] === w ? curr : acc),
      w.toString(),
    ),
  );

const Template = () => {
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
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Font Family</TableCell>
              <TableCell>Font Weight</TableCell>
              <TableCell>Font Size</TableCell>
              <TableCell>Text Transform</TableCell>
              <TableCell>Line Height</TableCell>
              <TableCell>Letter Spacing</TableCell>
              <TableCell>Sample</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variantKeys.map((key) => (
              <TableRow key={key}>
                <TableCell sx={typography[key]}>{key}</TableCell>
                <TableCell>{typography[key].fontFamily}</TableCell>
                <TableCell>
                  {formatFontweight(typography[key].fontWeight)}
                </TableCell>
                <TableCell>{typography[key].fontSize}px</TableCell>
                <TableCell>{typography[key].textTransform ?? ''}</TableCell>
                <TableCell>{typography[key].lineHeight}</TableCell>
                <TableCell>{typography[key].letterSpacing}</TableCell>
                <TableCell>
                  <Typography sx={typography[key]}>{sample}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
