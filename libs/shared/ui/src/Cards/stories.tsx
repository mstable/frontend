import { LoremIpsum } from '@frontend/shared-storybook';
import { Grid } from '@mui/material';

import { TitleCard as TCard } from './TitleCard';

export default {
  title: 'Components/Cards',
  subcomponents: { TitleCard: TCard },
};

export const TitleCard = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TCard title="Card Title" footer="Card Footer">
        <LoremIpsum />
      </TCard>
    </Grid>
    <Grid item xs={12} md={8}>
      <TCard title="Card Title" footer="Card Footer">
        <LoremIpsum />
      </TCard>
    </Grid>
    <Grid item xs={12} md={4}>
      <TCard title="Card Title" footer="Card Footer">
        <LoremIpsum />
      </TCard>
    </Grid>
  </Grid>
);
