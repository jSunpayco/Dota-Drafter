import React = require('react');
import { createStyles, Text, Title } from '@mantine/core';

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
    padding: '20px',
    height: '15px',
    borderRadius: '10px',
    textAlign: 'center',
  },

  link: {
    color: 'black',
    fontWeight: '700px',
    cursor: 'pointer',
  },
}));

const HeaderMiddle = () => {
  const { classes, cx } = useStyles();
  return (
    <div>
      <div className={classes.navbar}>
        <Title className={classes.logo} order={2}>
          DOTA Drafter
        </Title>
        <nav>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Text className={classes.link} weight={700} href="/">
                Home
              </Text>
            </li>
            <li className={classes.listItem}>
              <Text className={classes.link} weight={700} href="/drafter">
                Drafter
              </Text>
            </li>
            <li className={classes.listItem}>
              <Text className={classes.link} weight={700} href="/about">
                About
              </Text>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMiddle;
