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
import { useState, useEffect } from 'react';

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
  var currText = '';
  const [sample, setSample] = useState(currText);

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return function cleanup() {
      document.removeEventListener('keydown', keyPress);
    };
  }, []);

  function keyPress(event) {
    if (event.keyCode === 8) {
      setSample(sample.slice(0, -1));
    }
    // else if(event.target.innerHTML === 'enter'){
    //   setSample();
    // }
    else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      currText += event.key;
      setSample(currText);
    }
  }

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '100px' }}>
        <p>{sample}</p>
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
