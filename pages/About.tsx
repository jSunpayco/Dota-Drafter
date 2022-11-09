import React = require('react');
import HeaderMiddle from '../components/HeaderMiddle';
import { constants } from '../Constants';
import {
  createStyles,
  Container,
  Radio,
  Button,
  Table,
  Modal,
} from '@mantine/core';
import { useState, useEffect, useRef } from 'react';

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
  timerNavBar: {
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  testing: {
    backgroundColor: 'red',
  },

  timerNavItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '10px',
  },
}));

function About() {
  const [opened, setOpened] = useState(false);
  const [userTeam, setUserTeam] = useState('');
  const [pickTurn, setPickTurn] = useState('');

  // useEffect(() => {

  //   document.addEventListener('keydown', keyPress);
  //   return function cleanup() {
  //     document.removeEventListener('keydown', keyPress);
  //   };
  //   }
  // }, []);

  // function keyPress(event) {
  //   if (event.keyCode === 8) {
  //     setSample(sample.slice(0, -1));
  //   }
  //   // else if(event.target.innerHTML === 'enter'){
  //   //   setSample();
  //   // }
  //   else if (
  //     (event.keyCode >= 65 && event.keyCode <= 90) ||
  //     (event.keyCode >= 97 && event.keyCode <= 122)
  //   ) {
  //     currText += event.key;
  //     setSample(currText);
  //   }

  function handleClosing() {
    if (userTeam != '' && pickTurn != '') {
      setOpened(false);
    }
  }

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '100px' }}>
        <Modal
          opened={opened}
          onClose={() => handleClosing()}
          title="Draft Settings"
        >
          <Radio.Group
            onChange={setUserTeam}
            name="userSide"
            label="Select your side/team"
            required
          >
            <Radio value="radiant" label="Radiant" />
            <Radio value="dire" label="Dire" />
          </Radio.Group>

          <Radio.Group
            name="userPickTurn"
            label="Select your pick turn"
            required
            onChange={setPickTurn}
          >
            <Radio value="first" label="First" />
            <Radio value="second" label="Second" />
          </Radio.Group>
        </Modal>
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
        <p>{userTeam}</p>
        <p>{pickTurn}</p>

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
