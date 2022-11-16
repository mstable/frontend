import { Grid, Stack, Typography, useTheme } from '@mui/material';

export default {
  title: 'Theme/Shadows',
};

const Template = () => {
  const theme = useTheme();

  return (
    <Stack p={2}>
      <Grid container spacing={6}>
        {theme.shadows.map((s, i) => (
          <Grid item key={`shadow-${i}`}>
            <Stack
              direction="column"
              spacing={1}
              sx={{
                width: 200,
                height: 100,
                backgroundColor: 'background.paper',
                boxShadow: s,
                padding: 1,
              }}
            >
              <Typography variant="label1">Shadow: {i}</Typography>
              <Typography variant="value6">{s}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
