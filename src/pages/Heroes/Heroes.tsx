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
    Modal,
    clsx,
  } from '@mantine/core';
  import './heroes.css';
  // import { IconSearch } from '@tabler/icons';
  import React from 'react';
  import HeaderMiddle from '../../components/HeaderMiddle.tsx';
  import { useEffect, useState, useMemo } from 'react';
  import axios from 'axios';
  import { constants } from '../../Constants.tsx';
  
  const useStyles = createStyles((theme) => ({  
    container: {
      minWidth: 500,
      marginTop: '100px',
      marginLeft: '150px',
      marginRight: '150px'
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
      transition: 'transform 150ms ease',
  
      '&:hover': {
        boxShadow: `${theme.shadows.md} !important`,
        transform: 'scale(2)',
        cursor: 'pointer',
      },
    },
  
    inner: {
      height: 60,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    iFrameDiv: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      paddingTop: '56.25%',
    },
  
    myIframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      border: 'none',
    },
  }));
  
  function Heroes() {
    const { classes, cx } = useStyles();
  
    const [isModalOpened, setModalOpened] = useState(false);
    const [heroPicked, setHeroPicked] = useState<String>('');
  
    const [heroStatus, setHeroStatus] = useState<any[]>([]);
  
    const [heroStatusFiltered, setHeroStatusFiltered] = useState<any[]>([]);
  
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
      // axios.get('https://dota-drafter.onrender.com/heroStatus')
      // .then((res) => {
      //   setHeroStatus(res.data)
      //   setHeroStatusFiltered(res.data)
      // })
      // .catch((err) => console.log("Oh no! " + err)
      // )

      return fetch(constants.urlHeroStats)
        .then((response) => response.json())
        .then((data) => {
          setHeroStatus(data)
          setHeroStatusFiltered(data)
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
  
    const heroCards = heroStatusFiltered
      .sort((a, b) => {
        return a.localized_name > b.localized_name ? 1 : -1;
      })
      .map((heroItem) => (
           <div 
            className={'card'} 
            style={{backgroundImage: `url(${constants.urlMainApi + heroItem.img})`, backgroundSize:'100% 100%'}} 
            key={heroItem.localized_name}
            onClick={() => openModal(heroItem.localized_name)}>
              <div className={'heroContainer'}>
                <img className={'heroAttribute'} src={constants.urlAgility}></img>
                <h2 className={'heroName'}>{heroItem.localized_name}</h2>
              </div>
           </div>
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
  
    function openModal(heroName) {
      setModalOpened(true);
      setHeroPicked(heroName);
    }
  
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
  
        <div className={classes.container}>
          <Modal
            opened={isModalOpened}
            onClose={() => setModalOpened(false)}
            size="1080px"
          >
            <div className={classes.iFrameDiv}>
              <iframe
                src={'https://dota2.fandom.com/wiki/' + heroPicked}
                height="100%"
                width=" 100%"
                className={classes.myIframe}
              ></iframe>
            </div>
          </Modal>
          <Header className={classes.inner}>
            <Text size={26} weight={700}>
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
              // icon={<IconSearch size={18} stroke={1.5} />}
              radius="xl"
              size="md"
              placeholder="Search Heroes"
              rightSectionWidth={42}
              onChange={textFilter}
            />
          </Header>
  
          <Space h="sm" />
  
          <SimpleGrid cols={5} breakpoints={[{ maxWidth: 'md', cols: 3 }]}>
            {heroCards}
          </SimpleGrid>
        </div>
        {/* <Image src={constants.urlMainApi + first.img}></Image> */}
      </div>
    );
  }
  
  export default Heroes;
  