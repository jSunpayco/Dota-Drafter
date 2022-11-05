import React = require('react');
import HeaderMiddle from '../components/HeaderMiddle';
import { constants } from '../Constants';
import {
  createStyles,
  Container,
  TextInput,
  Button,
  Table,
  Text,
  Header,
  Group,
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
  const { classes, cx } = useStyles();
  var currText = '';
  const [sample, setSample] = useState(currText);

  const [isCountingDown, setCountingDown] = useState(false);
  const [radiantExtraTime, setRadiantExtraTime] = useState(
    constants.radiantExtraTime
  );
  const [direExtraTime, setDireExtraTime] = useState(constants.direExtraTime);
  const [currDraftTime, setCurrDraftTime] = useState(constants.pickTime);
  const [inExtraTime, setInExtraTime] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
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
    if (currDraftTime <= 0) {
      if (!inExtraTime) {
        setInExtraTime(true);
        setCurrDraftTime(radiantExtraTime);
        clearInterval(countRef.current);
        countRef.current = setInterval(() => {
          setCurrDraftTime((timer) => timer - 1);
        }, 1000);
      } else {
        setInExtraTime(false);
        setCountingDown(!isCountingDown);
        clearInterval(countRef.current);
      }
    }
  }, [currDraftTime]);

  const handleTimer = () => {
    if (!isCountingDown) {
      setCountingDown(!isCountingDown);
      countRef.current = setInterval(() => {
        setCurrDraftTime((timer) => timer - 1);
      }, 1000);
    } else {
      setCountingDown(!isCountingDown);
      clearInterval(countRef.current);
    }
  };

  const selectHero = () => {
    setCountingDown(true);
    setCurrDraftTime(constants.pickTime);
    clearInterval(countRef.current);
    countRef.current = setInterval(() => {
      setCurrDraftTime((timer) => timer - 1);
    }, 1000);
  };

  function secondsToMinutes(secs) {
    const newMin = Math.floor(secs / 60);
    const newSec = secs % 60;

    return (
      newMin.toString() +
      ':' +
      (newSec < 9 ? '0' + newSec.toString() : newSec.toString())
    );
  }

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '100px' }}>
        <Header className={classes.timerNavBar}>
          <div className={classes.timerNavItems}>
            <Text size="xl" weight={700}>
              Radiant Pick
            </Text>
            <Text size="xl" weight={300}>
              {secondsToMinutes(currDraftTime)}
            </Text>

            <Group position="center" spacing="xs">
              <Button onClick={handleTimer}>
                {isCountingDown ? 'Pause' : 'Start'}
              </Button>
              {/* <Button onClick={pauseTimer}>Pause</Button> */}
              <Button onClick={selectHero}>Pick</Button>
            </Group>
          </div>
        </Header>
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
