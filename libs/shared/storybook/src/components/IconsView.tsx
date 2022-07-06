import { useState } from 'react';

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import { MagnifyingGlass, X } from 'phosphor-react';
import { useEffectOnce } from 'react-use';

import type { ChangeEvent } from 'react';

export default {
  title: 'Components/Icons',
};

// eslint-disable-next-line react/prop-types
export const IconsView = ({ icons, ...args }) => {
  const [search, setSearch] = useState('');
  const [iconList, setIconList] = useState([]);

  useEffectOnce(() => {
    const load = () => {
      for (const icon in icons) {
        setIconList((prev) => [
          ...prev,
          { name: icon, component: icons[icon] },
        ]);
      }
    };

    load();
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedInput
          aria-label="search"
          placeholder="Search icons"
          value={search}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlass />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                disabled={search.length === 0}
                onClick={() => {
                  setSearch('');
                }}
              >
                <X />
              </IconButton>
            </InputAdornment>
          }
          sx={{ width: 1 / 2, mb: 4 }}
        />
      </Box>

      <Grid container spacing={2}>
        {iconList
          .filter(
            (icon) =>
              search === undefined ||
              search.length === 0 ||
              new RegExp(search, 'i').test(icon.name),
          )
          .map((icon) => (
            <Grid
              item
              xs={4}
              sm={3}
              md={2}
              xl={1}
              key={icon.name}
              minWidth={160}
            >
              <Paper
                sx={{
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    svg: {
                      width: 32,
                      height: 32,
                    },
                  }}
                >
                  <icon.component />
                </Box>
                <Typography
                  noWrap
                  fontSize={12}
                  lineHeight="17px"
                  textAlign="center"
                  px={1}
                  pb={1}
                  title={icon.name}
                >
                  {icon.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
