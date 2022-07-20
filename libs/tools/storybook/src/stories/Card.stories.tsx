import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

export default {
  title: 'Theme/Cards',
  subcomponents: { Card: MuiCard, CardContent, CardHeader, CardActions },
};

export const TitleCard = () => (
  <MuiCard sx={{ width: 600 }}>
    <CardHeader title="Card Title" action={<Button>Click me</Button>} />
    <CardContent>
      <Typography>Card content</Typography>
    </CardContent>
    <Divider />
    <CardContent>
      <Typography>Card other content</Typography>
    </CardContent>
  </MuiCard>
);
