import {
  AspectRatio,
  Container,
  SimpleGrid,
  createStyles,
  Image,
  TextInput,
  Space,
  Title,
} from '@mantine/core';
import { IconBrandYoutube } from '@tabler/icons';
import React = require('react');
import { useEffect, useState, useMemo } from 'react';
import { constants } from '../Constants';
import _ = require('lodash');

import HeaderMiddle from '../components/HeaderMiddle';
import DraftedHeroes from '../components/DraftedHeroes';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease',

    '&:hover': {
      transform: 'scale(1.2)',
      cursor: 'pointer',
    },
  },

  container: {
    marginLeft: 50,
    flex: 1,
    minWidth: '600px',
  },

  drafted: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    maxHeight: '1000px',
  },

  timeline: {
    maxHeight: '1000px',
  },

  divider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },

  picked: {
    filter: 'grayscale(100%)',
    pointerEvents: 'none',
  },
}));

function Drafter() {
  const { classes } = useStyles();

  const [heroAgility, setHeroAgility] = useState([]);
  const [heroIntelligence, setHeroIntelligence] = useState([]);
  const [heroStrength, setHeroStrength] = useState([]);

  const [listItem, setListItem] = useState('');

  const [pickList, setPickList] = useState(constants.pickList);
  const [selectedHeroes, setSelectedHeroes] = useState(constants.pickList);

  const [currPick, setCurrPick] = useState(1);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    fetchHeroStatus();
  }, []);

  const fetchHeroStatus = () => {
    return fetch(constants.urlHeroStats)
      .then((response) => response.json())
      .then((data) => {
        setHeroAgility(
          data.filter((hero) => {
            return hero.primary_attr == 'agi';
          })
        );
        setHeroIntelligence(
          data.filter((hero) => {
            return hero.primary_attr == 'int';
          })
        );
        setHeroStrength(
          data.filter((hero) => {
            return hero.primary_attr == 'str';
          })
        );
      });
  };

  const realHeroIndex = (index, attr) => {
    let newIndex = index;
    if (attr == 'int') {
      newIndex += heroAgility.length;
    } else if (attr == 'str') {
      newIndex += heroAgility.length;
      newIndex += heroIntelligence.length;
    }

    return newIndex;
  };

  const heroCards = (attr, attrName) => {
    return attr
      .sort((a, b) => {
        return a.localized_name > b.localized_name ? 1 : -1;
      })
      .map((heroItem, index) => (
        <AspectRatio ratio={1920 / 1080}>
          <Image
            key={heroItem.localized_name}
            p="md"
            radius="md"
            className={
              selectedHeroes.some(
                (item) => item == realHeroIndex(index, attrName)
              )
                ? classes.picked
                : classes.card
            }
            src={constants.urlMainApi + heroItem.img}
            onClick={() =>
              pickAHero(
                constants.urlMainApi + heroItem.img,
                realHeroIndex(index, attrName)
              )
            }
          />
        </AspectRatio>
      ));
  };

  function pickAHero(heroImage, filteredIndex) {
    const tempList = [...pickList];
    if (tempList[currIndex].pickOrder1 == currPick) {
      tempList[currIndex].pickImage1 = heroImage;
      if (currPick > pickList[currIndex].pickOrder2) {
        setCurrIndex(currIndex + 1);
      }
    } else {
      tempList[currIndex].pickImage2 = heroImage;
      if (currPick > pickList[currIndex].pickOrder1) {
        setCurrIndex(currIndex + 1);
      }
    }
    setSelectedHeroes([...selectedHeroes, filteredIndex]);
    setPickList(tempList);
    setCurrPick(currPick + 1);
  }

  return (
    <div>
      <HeaderMiddle />
      <div className={classes.divider}>
        <Container size={'sm'} className={classes.container}>
          <Title order={1}>Agility</Title>
          <Space h="xl" />
          <SimpleGrid
            cols={9}
            breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
            spacing="xs"
          >
            {heroCards(heroAgility, 'agi')}
          </SimpleGrid>

          <Space h="xl" />
          <Title order={1}>Intelligence</Title>
          <Space h="xl" />
          <SimpleGrid
            cols={9}
            breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
            spacing="xs"
          >
            {heroCards(heroIntelligence, 'int')}
          </SimpleGrid>

          <Space h="xl" />
          <Title order={1}>Strength</Title>
          <Space h="xl" />
          <SimpleGrid
            cols={9}
            breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
            spacing="xs"
          >
            {heroCards(heroStrength, 'str')}
          </SimpleGrid>
        </Container>
        <Container className={classes.drafted}>
          <TextInput
            icon={<IconBrandYoutube size={18} stroke={1.5} />}
            radius="xl"
            size="md"
            placeholder="Search Heroes"
            rightSectionWidth={42}
            value={listItem}
            onChange={(e) => {
              setListItem(e.currentTarget.value);
            }}
          />
          <DraftedHeroes pickList={pickList} />
        </Container>
      </div>
    </div>
  );
}

export default Drafter;
