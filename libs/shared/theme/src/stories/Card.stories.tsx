import { LoremIpsum } from '@frontend/tools-storybook';
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';

export default {
  title: 'Theme/Cards',
  subcomponents: { Card: MuiCard, CardContent, CardHeader, CardActions },
};

export const TitleCard = () => (
  <MuiCard sx={{ width: 600 }}>
    <CardHeader title="Card Title" action={<Button>Click me</Button>} />
    <CardContent>
      <LoremIpsum />
    </CardContent>
    <Divider />
    <CardContent>
      <LoremIpsum />
    </CardContent>
  </MuiCard>
);
