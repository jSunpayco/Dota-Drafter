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
import { IconBrandYoutube } from '@tabler/icons';
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

  const [currPick, setCurrPick] = useState(1);
  const [currIndex, setCurrIndex] = useState(0);

  const [myList, setMyList] = useState(constants.pickList);

  const rows = myList.map((element) => (
    <tr key={element.pickOrder1}>
      <td align="right">
        <div
          className={
            element.pickType1 == 'Ban' ? classes.heroImageBanBorder : undefined
          }
        >
          <img
            className={
              element.pickType1 == 'Pick'
                ? classes.heroImagePick
                : classes.heroImageBan
            }
            src={element.pickImage1}
          />
        </div>
      </td>
      <td>
        <div
          className={
            element.pickType1 == 'Ban' ? classes.heroImageBanBorder : undefined
          }
        >
          <img
            className={
              element.pickType2 == 'Pick'
                ? classes.heroImagePick
                : classes.heroImageBan
            }
            src={element.pickImage2}
          />
        </div>
      </td>
    </tr>
  ));

  function pickAHero() {
    const tempList = [...myList];
    if (tempList[currIndex].pickOrder2 == currPick) {
      tempList[currIndex].pickImage2 =
        'https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4f/The_Disciple%27s_Path_Anti-Mage_icon.png';
      setMyList(tempList);
      setCurrIndex(currIndex + 1);
    }
    setCurrPick(currPick + 1);
  }

  return (
    <div>
      <HeaderMiddle />

      <Button onClick={pickAHero}>click to add</Button>

      <Container size={200}>
        <Table horizontalSpacing="xs" withColumnBorders>
          <thead>
            <tr>
              <th>Radiant</th>
              <th>Dire</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </div>
  );
}

export default About;
