import React = require('react');
import {
  createStyles,
  Container,
  TextInput,
  Button,
  Table,
} from '@mantine/core';

// Add item reference https://stackblitz.com/edit/simple-react-todo-example-qevigz?file=index.js
// Timeline reference https://react-timeline.com/?path=/story/intro--page

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

function DraftedHeroes(props) {
  const { classes, cx } = useStyles();

  const rows = props.pickList.map((element) => (
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
      </Container>
    </div>
  );
}

export default DraftedHeroes;
