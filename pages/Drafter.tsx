import {
  AspectRatio,
  Container,
  SimpleGrid,
  createStyles,
  Image,
  TextInput,
  Space,
  Title,
  Tooltip,
  Header,
  Text,
  Button,
} from '@mantine/core';
import React = require('react');
import { useEffect, useState } from 'react';
import { constants } from '../Constants';

import HeaderMiddle from '../components/HeaderMiddle';
import DraftedHeroes from '../components/DraftedHeroes';
import { IconSearch } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease',

    '&:hover': {
      transform: 'scale(1.2)',
      cursor: 'pointer',
    },
  },

  mainBody: {
    width: '100%',
    minWidth: '200px',
    marginTop: '80px',
  },

  timerNavBar: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  container: {
    marginLeft: 0,
    flex: 1,
    minWidth: '800px',
  },

  drafted: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    maxHeight: '1000px',
    maxWidth: 'fit-content',
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

  filteredOut: {
    transition: '150ms',
    filter: 'grayscale(100%)',
    pointerEvents: 'none',
  },
}));

function Drafter() {
  const { classes, cx } = useStyles();

  const [isLoading, setIsLoading] = useState(true);

  const [heroAgility, setHeroAgility] = useState([]);
  const [heroIntelligence, setHeroIntelligence] = useState([]);
  const [heroStrength, setHeroStrength] = useState([]);

  const [heroAgilityFiltered, setHeroAgilityFiltered] = useState([]);
  const [heroIntelligenceFiltered, setHeroIntelligenceFiltered] = useState([]);
  const [heroStrengthFiltered, setHeroStrengthFiltered] = useState([]);

  const [pickList, setPickList] = useState(constants.pickList);
  const [selectedHeroes, setSelectedHeroes] = useState(constants.pickList);
  const [filteredHeroes, setFilteredHeroes] = useState([]);

  const [currPick, setCurrPick] = useState(1);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    fetchHeroStatus();
  }, []);

  function keyPress(event) {
    if (event.target.value != '') {
      let newAgi = heroAgility.filter((newItem) => {
        return !newItem.localized_name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase());
      });
      let newInt = heroIntelligence.filter((newItem) => {
        return !newItem.localized_name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase());
      });
      let newStr = heroStrength.filter((newItem) => {
        return !newItem.localized_name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase());
      });
      // setHeroAgilityFiltered(newItem);
      newAgi = newAgi.map((item) => item.hero_id);
      newInt = newInt.map((item) => item.hero_id);
      newStr = newStr.map((item) => item.hero_id);
      setFilteredHeroes([...newAgi, ...newInt, ...newStr]);
    } else {
      setFilteredHeroes([]);
    }
    console.log(filteredHeroes);
  }

  const fetchHeroStatus = () => {
    return fetch(constants.urlHeroStats)
      .then((response) => response.json())
      .then((data) => {
        setHeroAgility(
          data.filter((hero) => {
            return hero.primary_attr == 'agi';
          })
        );
        setHeroAgilityFiltered(
          data.filter((hero) => {
            return hero.primary_attr == 'agi';
          })
        );
        setHeroIntelligence(
          data.filter((hero) => {
            return hero.primary_attr == 'int';
          })
        );
        setHeroIntelligenceFiltered(
          data.filter((hero) => {
            return hero.primary_attr == 'int';
          })
        );
        setHeroStrength(
          data.filter((hero) => {
            return hero.primary_attr == 'str';
          })
        );
        setHeroStrengthFiltered(
          data.filter((hero) => {
            return hero.primary_attr == 'str';
          })
        );
      })
      .then(function (data) {
        setIsLoading(!isLoading);
      });
  };

  const heroCards = (attr) => {
    return attr
      .sort((a, b) => {
        return a.localized_name > b.localized_name ? 1 : -1;
      })
      .map((heroItem) => (
        <AspectRatio ratio={1920 / 1080}>
          <Tooltip label={heroItem.localized_name} multiline>
            <Image
              key={heroItem.localized_name}
              p="md"
              radius="md"
              className={cx(
                selectedHeroes.some((item) => item == heroItem.hero_id)
                  ? classes.picked
                  : classes.card,
                filteredHeroes.some((item) => item == heroItem.hero_id)
                  ? classes.filteredOut
                  : classes.card
              )}
              src={constants.urlMainApi + heroItem.img}
              onClick={() =>
                pickAHero(
                  constants.urlMainApi + heroItem.img,
                  heroItem.hero_id,
                  heroItem.localized_name
                )
              }
            />
          </Tooltip>
        </AspectRatio>
      ));
  };

  function pickAHero(heroImage, filteredIndex, heroName) {
    const tempList = [...pickList];
    if (tempList[currIndex].pickOrder1 == currPick) {
      tempList[currIndex].pickImage1 = heroImage;
      tempList[currIndex].hero1 = heroName;
      if (currPick > pickList[currIndex].pickOrder2) {
        setCurrIndex(currIndex + 1);
      }
    } else {
      tempList[currIndex].pickImage2 = heroImage;
      tempList[currIndex].hero2 = heroName;
      if (currPick > pickList[currIndex].pickOrder1) {
        setCurrIndex(currIndex + 1);
      }
    }
    setSelectedHeroes([...selectedHeroes, filteredIndex]);
    setPickList(tempList);
    setCurrPick(currPick + 1);
  }

  return (
    <div className={classes.mainBody}>
      <HeaderMiddle activeTab={constants.drafterPageIndex} />
      <Header className={classes.timerNavBar}>
        <Text size="xl" weight={700}>
          Radiant Pick
        </Text>

        <Button>Start</Button>
        <Text size="xl" weight={300}>
          00:00
        </Text>

        <Button>Pause</Button>

        <Button>Reset</Button>
      </Header>

      <Space h="sm" />

      <TextInput
        icon={<IconSearch size={18} stroke={1.5} />}
        radius="xl"
        size="md"
        placeholder="Search Heroes"
        rightSectionWidth={42}
        onChange={keyPress}
      />

      <div className={classes.divider}>
        <Container size={'lg'} className={classes.container}>
          {isLoading ? null : (
            <div>
              <Title order={2}>Agility</Title>
              <Space h="sm" />
              <SimpleGrid
                cols={15}
                breakpoints={[{ maxWidth: 'sm', cols: 5 }]}
                spacing="xs"
              >
                {heroCards(heroAgilityFiltered)}
              </SimpleGrid>
              <Space h="sm" />

              <Title order={2}>Intelligence</Title>
              <Space h="sm" />
              <SimpleGrid
                cols={15}
                breakpoints={[{ maxWidth: 'sm', cols: 5 }]}
                spacing="xs"
              >
                {heroCards(heroIntelligenceFiltered)}
              </SimpleGrid>
              <Space h="sm" />

              <Title order={2}>Strength</Title>
              <Space h="sm" />
              <SimpleGrid
                cols={15}
                breakpoints={[{ maxWidth: 'sm', cols: 5 }]}
                spacing="xs"
              >
                {heroCards(heroStrengthFiltered)}
              </SimpleGrid>
            </div>
          )}
        </Container>
        <Container className={classes.drafted}>
          <DraftedHeroes pickList={pickList} />
        </Container>
      </div>
    </div>
  );
}

export default Drafter;
