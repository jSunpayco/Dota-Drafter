import React = require('react');
import { createStyles, Text, Title, Anchor } from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    color: '#fff',
    opacity: 1,
    width: '100%',
    height: '70px',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 1,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  },

  logo: {
    padding: '20px',
    color: 'black',
  },

  list: {
    display: 'flex',
  },

  listItem: {
    listStyleType: 'none',
    padding: `7px ${theme.spacing.sm}px`,
    height: '15px',
    borderRadius: '10px',
    textAlign: 'center',
  },

  link: {
    textTransform: 'uppercase',
    fontSize: 16,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'border-color 100ms ease, color 100ms ease',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },

  activePage: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottomColor:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6],
  },
}));

const HeaderMiddle = (props) => {
  const { classes, cx } = useStyles();

  const [activeTab, setActiveTab] = useState(props.activeTab);

  return (
    <div>
      <div className={classes.navbar}>
        <Title className={classes.logo} order={2}>
          DOTA Drafter
        </Title>
        <nav>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Anchor
                weight={700}
                href="/"
                className={cx(classes.link, {
                  [classes.activePage]: activeTab == 0,
                })}
              >
                Home
              </Anchor>
            </li>
            <li className={classes.listItem}>
              <Anchor
                className={cx(classes.link, {
                  [classes.activePage]: activeTab == 1,
                })}
                weight={700}
                href="/drafter"
              >
                Drafter
              </Anchor>
            </li>
            <li className={classes.listItem}>
              <Anchor
                className={cx(classes.link, {
                  [classes.activePage]: activeTab == 2,
                })}
                weight={700}
                href="/about"
              >
                About
              </Anchor>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMiddle;
