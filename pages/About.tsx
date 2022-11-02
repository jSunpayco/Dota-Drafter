import React = require('react');
import HeaderMiddle from '../components/HeaderMiddle';
import { constants } from '../Constants';
import {
  createStyles,
  Container,
  TextInput,
  Button,
  Table,
} from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  heroImagePick: {
    outline: '3px solid green',
    borderRadius: '10px',
    width: 80,
    height: 44,
  },

  heroImageBanBorder: {
    outline: '2px solid red',
    borderRadius: '10px',
    width: 60,
    height: 33,
  },

  heroImageBan: {
    display: 'block',
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    filter: 'grayscale(100%)',
  },
}));

function About() {
  const { classes, cx } = useStyles();

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '100px' }}>
        <Button>click to add</Button>

        <Container size={200}>
          <Table horizontalSpacing="xs" withColumnBorders>
            <thead>
              <tr>
                <th>Radiant</th>
                <th>Dire</th>
              </tr>
            </thead>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default About;
