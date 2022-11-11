import {
  AspectRatio,
  Container,
  SimpleGrid,
  Card,
  createStyles,
  Image,
  Text,
  Grid,
  Header,
  Space,
  TextInput,
  HoverCard,
  Title,
  Group,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React = require('react');
import HeaderMiddle from '../components/HeaderMiddle';
import { useEffect, useState, useMemo } from 'react';
import { constants } from '../Constants';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease',

    '&:hover': {
      transform: 'scale(1.35)',
    },
  },

  container: {
    minWidth: 500,
    marginTop: '100px',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  Image: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.2)',
      cursor: 'pointer',
    },
  },
  inner: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function Heroes() {
  const { classes } = useStyles();

  const [heroStatus, setHeroStatus] = useState([]);

  const [heroStatusFiltered, setHeroStatusFiltered] = useState([]);

  const [currAttribute, setCurrAttribute] = useState('All');
  const [currAttackType, setCurrAttackType] = useState('All');
  const [currTextSearch, setTextSearch] = useState('');

  useEffect(() => {
    fetchHeroStatus();
  }, []);

  function attrUrl(attr) {
    if (attr == 'int') return constants.urlIntelligence;
    else if (attr == 'agi') return constants.urlAgility;
    else return constants.urlStrength;
  }

  function attackUrl(atk) {
    if (atk == 'Ranged') return constants.urlRanged;
    else return constants.urlMelee;
  }

  const fetchHeroStatus = () => {
    return fetch(constants.urlHeroStats)
      .then((response) => response.json())
      .then((data) => {
        setHeroStatus(data), setHeroStatusFiltered(data);
      });
  };

  const filterAttributes = (attr) => {
    if (currAttribute == attr) {
      setCurrAttribute('All');
      setHeroStatusFiltered(
        heroStatus
          .filter((newItem) => {
            return currAttackType != 'All'
              ? newItem.attack_type == currAttackType
              : newItem;
          })
          .filter((newItem) => {
            return newItem.localized_name
              .toLowerCase()
              .startsWith(currTextSearch);
          })
      );
    } else {
      setCurrAttribute(attr);
      const newItem = heroStatus
        .filter((newItem) => {
          return currAttackType != 'All'
            ? newItem.attack_type == currAttackType
            : newItem;
        })
        .filter((newItem) => {
          return newItem.localized_name
            .toLowerCase()
            .startsWith(currTextSearch);
        })
        .filter((newItem) => {
          return newItem.primary_attr == attr;
        });
      setHeroStatusFiltered(newItem);
    }
  };

  const filterAttackTypes = (atk) => {
    if (currAttackType == atk) {
      setCurrAttackType('All');
      setHeroStatusFiltered(
        heroStatus
          .filter((newItem) => {
            return currAttribute != 'All'
              ? newItem.primary_attr == currAttribute
              : newItem;
          })
          .filter((newItem) => {
            return newItem.localized_name
              .toLowerCase()
              .startsWith(currTextSearch);
          })
      );
    } else {
      setCurrAttackType(atk);
      const newItem = heroStatus
        .filter((newItem) => {
          return currAttribute != 'All'
            ? newItem.primary_attr == currAttribute
            : newItem;
        })
        .filter((newItem) => {
          return newItem.localized_name
            .toLowerCase()
            .startsWith(currTextSearch);
        })
        .filter((newItem) => {
          return atk != 'All' ? newItem.attack_type == atk : newItem;
        });
      setHeroStatusFiltered(newItem);
    }
  };

  const attribtues = [...new Set(heroStatus.map((Val) => Val.primary_attr))];
  const atkTypes = [...new Set(heroStatus.map((Val) => Val.attack_type))];

  let heroRoles = (roles) =>
    roles.map((role) => (
      <Group>
        <Space w="xs" />
        <Text size="xl">{role}</Text>
      </Group>
    ));

  const heroCards = heroStatusFiltered
    .sort((a, b) => {
      return a.localized_name > b.localized_name ? 1 : -1;
    })
    .map((heroItem) => (
      <HoverCard shadow="md" withArrow closeDelay={50}>
        <HoverCard.Target>
          <Card
            key={heroItem.localized_name}
            p="md"
            radius="md"
            component="a"
            href="#"
            className={classes.card}
          >
            <AspectRatio ratio={1920 / 1080}>
              <Image src={constants.urlMainApi + heroItem.img} />
            </AspectRatio>
          </Card>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Title order={3}>{heroItem.localized_name}</Title>
          <Space h="xs" />
          <Grid cols={5}>
            <Image
              width={30}
              height={30}
              src={attrUrl(heroItem.primary_attr)}
            ></Image>
            {heroRoles(heroItem.roles)}
          </Grid>
        </HoverCard.Dropdown>
      </HoverCard>
    ));

  const attributeFilters = attribtues.map((attr) => {
    return (
      <Image
        width={30}
        height={30}
        src={attrUrl(attr)}
        className={classes.Image}
        onClick={() => filterAttributes(attr)}
        mx={5}
      >
        {attr}
      </Image>
    );
  });

  const attackTypeFilters = atkTypes.map((atk) => {
    return (
      <Image
        width={30}
        height={30}
        src={attackUrl(atk)}
        className={classes.Image}
        onClick={() => filterAttackTypes(atk)}
        mx={5}
      >
        {atk}
      </Image>
    );
  });

  const textFilter = (e) => {
    if (e.target.value == '') {
      const newItem = heroStatus
        .filter((newItem) => {
          return currAttackType != 'All'
            ? newItem.attack_type == currAttackType
            : newItem;
        })
        .filter((newItem) => {
          return currAttribute != 'All'
            ? newItem.primary_attr == currAttribute
            : newItem;
        });
      setHeroStatusFiltered(newItem);
      setTextSearch('');
    } else {
      const newItem = heroStatus
        .filter((newItem) => {
          return currAttackType != 'All'
            ? newItem.attack_type == currAttackType
            : newItem;
        })
        .filter((newItem) => {
          return currAttribute != 'All'
            ? newItem.primary_attr == currAttribute
            : newItem;
        })
        .filter((newItem) => {
          return newItem.localized_name
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase());
        });
      setHeroStatusFiltered(newItem);
      setTextSearch(e.target.value.toLowerCase());
    }
  };

  return (
    <div>
      <HeaderMiddle activeTab={constants.homePageIndex} />

      <Container py="xl" className={classes.container}>
        <Header className={classes.inner}>
          <Text size="xl" weight={700}>
            Filters
          </Text>

          <Grid cols={3}>
            <Text size={22} weight={300}>
              Attribute
            </Text>
            <Group>{attributeFilters}</Group>
          </Grid>
          <Grid cols={3}>
            <Text size="xl" weight={300}>
              Attack Type
            </Text>
            <Group>{attackTypeFilters}</Group>
          </Grid>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            radius="xl"
            size="md"
            placeholder="Search Heroes"
            rightSectionWidth={42}
            onChange={textFilter}
          />
          <Space h="xs" />
        </Header>

        <Space h="sm" />

        <SimpleGrid cols={5} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {heroCards}
        </SimpleGrid>
      </Container>
      {/* <Image src={constants.urlMainApi + first.img}></Image> */}
    </div>
  );
}

export default Heroes;
