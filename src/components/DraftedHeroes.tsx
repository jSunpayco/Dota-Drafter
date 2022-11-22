const React = require('react')
const { createStyles, Container, Table, Tooltip } = require('@mantine/core')
const constants = require('../Constants.tsx')

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
}));

function DraftedHeroes(props) {
  const { classes, cx } = useStyles();

  const rows = props.pickList.map((element) => (
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
