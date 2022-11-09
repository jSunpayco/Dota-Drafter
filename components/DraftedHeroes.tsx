import React = require('react');
import { createStyles, Container, Table, Tooltip, Button } from '@mantine/core';
import { constants } from '../Constants';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  heroImagePick: {
    outline: '3px solid green',
    borderRadius: '10px',
    width: 60,
    height: 33,
  },

  heroImageBanBorder: {
    outline: '2px solid red',
    borderRadius: '10px',
    width: 50,
    height: 28,
  },

  heroImageBan: {
    display: 'block',
    borderRadius: '10px',
    width: '100%',
    height: '100%',
  },

  greyFilter: {
    filter: 'grayscale(100%)',
  },

  pickButton: {
    width: '100%',
  },
}));

function DraftedHeroes(props) {
  const { classes, cx } = useStyles();

  const [pickList, setPickList] = useState(constants.pickRadiantFirst);

  const [isRadiantFirst, setRadiantFirst] = useState();

  const rows = pickList.map((element) => (
    <tr key={element.pickOrder1}>
      <td align="right">
        <Tooltip label={element.hero1}>
          <div
            className={
              element.pickType == 'Ban' ? classes.heroImageBanBorder : undefined
            }
          >
            <img
              className={
                element.pickType == 'Pick'
                  ? classes.heroImagePick
                  : element.pickImage1 == constants.urlCurrPick
                  ? classes.heroImageBan
                  : cx(classes.heroImageBan, classes.greyFilter)
              }
              src={element.pickImage1}
            />
          </div>
        </Tooltip>
      </td>
      <td>
        <Tooltip label={element.hero2}>
          <div
            className={
              element.pickType == 'Ban' ? classes.heroImageBanBorder : undefined
            }
          >
            <img
              className={
                element.pickType == 'Pick'
                  ? classes.heroImagePick
                  : element.pickImage2 == constants.urlCurrPick
                  ? classes.heroImageBan
                  : cx(classes.heroImageBan, classes.greyFilter)
              }
              src={element.pickImage2}
            />
          </div>
        </Tooltip>
      </td>
    </tr>
  ));

  function testing() {
    if (isRadiantFirst == undefined) console.log('test');
    else if (isRadiantFirst == true) {
      const tempList = [...pickList];
      tempList[0].pickImage1 = constants.urlCurrPick;
      setPickList(tempList);
    } else {
      const tempList = [...pickList];
      tempList[0].pickImage2 = constants.urlCurrPick;
      setPickList(tempList);
    }
  }

  return (
    <div>
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
        <Button onClick={testing} className={classes.pickButton}>
          Pick {props.currPick}
        </Button>
      </Container>
    </div>
  );
}

export default DraftedHeroes;
