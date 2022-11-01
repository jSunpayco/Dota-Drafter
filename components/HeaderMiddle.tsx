import React = require('react');
import {
  createStyles,
  Header,
  Container,
  Group,
  ActionIcon,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,
    marginRight: 300,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const HeaderMiddle = () => {
  const { classes, cx } = useStyles();
  return (
    <div style={{ width: '100%' }}>
      <Header height={56} mb={120}>
        <Container className={classes.inner}>
          <Group className={classes.links} spacing={5} noWrap>
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="drafter" className={classes.link}>
              Drafter
            </a>
            <a href="about" className={classes.link}>
              About
            </a>
          </Group>
        </Container>
      </Header>
    </div>
  );
};

export default HeaderMiddle;
