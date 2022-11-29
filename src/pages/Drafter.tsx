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
    Modal,
    Text,
    Button,
    Group,
    Radio,
  } from '@mantine/core';
  import * as React from 'react';
  import { useEffect, useState, useRef } from 'react';
  import { constants } from '../Constants.tsx';
  
  import HeaderMiddle from '../components/HeaderMiddle.tsx';
  import DraftedHeroes from '../components/DraftedHeroes.tsx';
  import {ColorRing} from 'react-loader-spinner';
  // import { IconSearch } from '@tabler/icons';
  import axios from 'axios';
  
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
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    timerNavItems: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '10px',
    },
  
    extraTime: {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#e8e9e8',
      marginRight: '50px',
      marginLeft: '50px',
      padding: '20px',
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
  
    paused: {
      pointerEvents: 'none',
    },
  }));
  
  function Drafter() {
    const { classes, cx } = useStyles();
  
    const [isLoading, setIsLoading] = useState(true);
  
    const [allHeroes, setAllHeroes] = useState<any[]>([]);
  
    const [isModalOpened, setModalOpened] = useState(false);
    const [userTeam, setUserTeam] = useState('');
    const [pickTurn, setPickTurn] = useState('');
  
    const [heroAgilityFiltered, setHeroAgilityFiltered] = useState<any[]>([]);
    const [heroIntelligenceFiltered, setHeroIntelligenceFiltered] = useState<any[]>([]);
    const [heroStrengthFiltered, setHeroStrengthFiltered] = useState<any[]>([]);
  
    const [pickList, setPickList] = useState(constants.pickRadiantFirst);
    const [selectedHeroes, setSelectedHeroes] = useState<any[]>([]);
    const [filteredHeroes, setFilteredHeroes] = useState<any[]>([]);
  
    const currPick = useRef(1);
    const currIndex = useRef(0);
  
    const [isCountingDown, setCountingDown] = useState(false);
    const [radiantExtraTime, setRadiantExtraTime] = useState(
      constants.radiantExtraTime
    );
    const [direExtraTime, setDireExtraTime] = useState(constants.direExtraTime);
    const [currDraftTime, setCurrDraftTime] = useState(constants.pickTime);
    const [inExtraTime, setInExtraTime] = useState(false);
    const countRef = useRef(null);
  
    const [isRadiantTurn, setRadiantTurn] = useState(true);
  
    useEffect(() => {
      fetchHeroStatus();
    }, []);
  
    useEffect(() => {
      if (currDraftTime <= 0) {
        if (!inExtraTime && radiantExtraTime > 0 && direExtraTime > 0) {
          setInExtraTime(true);
          if (isRadiantTurn) {
            setCurrDraftTime(radiantExtraTime);
          } else {
            setCurrDraftTime(direExtraTime);
          }
          clearInterval(countRef.current);
          countRef.current = setInterval(() => {
            setCurrDraftTime((timer) => timer - 1);
          }, 1000);
        } else {
          setInExtraTime(false);
          noHeroPicked();
          if (currPick.current > 24) {
            setCountingDown(!isCountingDown);
            clearInterval(countRef.current);
            setCurrDraftTime(0);
          }
        }
      }
    }, [currDraftTime]);
  
    function keyPress(event) {
      if (event.target.value != '') {
        let newAgi = heroAgilityFiltered.filter((newItem) => {
          return !newItem.localized_name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase());
        });
        let newInt = heroIntelligenceFiltered.filter((newItem) => {
          return !newItem.localized_name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase());
        });
        let newStr = heroStrengthFiltered.filter((newItem) => {
          return !newItem.localized_name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase());
        });
  
        newAgi = newAgi.map((item) => item.hero_id);
        newInt = newInt.map((item) => item.hero_id);
        newStr = newStr.map((item) => item.hero_id);
        setFilteredHeroes([...newAgi, ...newInt, ...newStr]);
      } else {
        setFilteredHeroes([]);
      }
    }
  
    const fetchHeroStatus = () => {
      axios.get('https://dota-drafter.onrender.com/heroStatus')
      .then((res) => {
        console.log("Fetched data")
        setAllHeroes(res.data);
        setHeroAgilityFiltered(
          res.data.filter((hero) => {
            return hero.primary_attr == 'agi';
          })
        );
        setHeroIntelligenceFiltered(
          res.data.filter((hero) => {
            return hero.primary_attr == 'int';
          })
        );
        setHeroStrengthFiltered(
          res.data.filter((hero) => {
            return hero.primary_attr == 'str';
          })
        );
      })
      .catch((err) => console.log(err)
      )
      .then(function (data) {
        console.log("set data")
        setIsLoading(false);
      });
    };
  
    const heroCards = (attr) => {
      return attr
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
                    : null,
                  isCountingDown ? null : classes.paused
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
  
    function setUserPreferences() {
      if (userTeam != '' && pickTurn != '') {
        setModalOpened(false);
        if (
          (userTeam == 'dire' && pickTurn == 'first') ||
          (userTeam == 'radiant' && pickTurn == 'second')
        ) {
          const tempList = [...constants.pickDireFirst];
          tempList[currIndex.current].pickImage2 = constants.urlCurrPick;
          setPickList(tempList);
          setRadiantTurn(false);
        } else {
          const tempList = [...pickList];
          tempList[currIndex.current].pickImage1 = constants.urlCurrPick;
          setPickList(tempList);
        }
      }
    }
  
    function resetTimer() {
      if (inExtraTime) {
        setInExtraTime(false);
        if (isRadiantTurn) {
          setRadiantExtraTime(currDraftTime);
        } else {
          setDireExtraTime(currDraftTime);
        }
      }
  
      setCountingDown(true);
      setCurrDraftTime(constants.pickTime);
      clearInterval(countRef.current);
      countRef.current = setInterval(() => {
        setCurrDraftTime((timer) => timer - 1);
      }, 1000);
    }
  
    function pickAHero(heroImage, filteredIndex, heroName) {
      resetTimer();
      // Add to list
      const tempList = [...pickList];
  
      if (tempList[currIndex.current].pickOrder1 == currPick.current) {
        tempList[currIndex.current].pickImage1 = heroImage;
        tempList[currIndex.current].hero1 = heroName;
        if (currPick.current > pickList[currIndex.current].pickOrder2) {
          currIndex.current += 1;
        }
      } else {
        tempList[currIndex.current].pickImage2 = heroImage;
        tempList[currIndex.current].hero2 = heroName;
        if (currPick.current > pickList[currIndex.current].pickOrder1) {
          currIndex.current += 1;
        }
      }
  
      currPick.current += 1;
  
      // Add current pick indicator
      if(currPick.current <= 24){
        if (tempList[currIndex.current].pickOrder2 == currPick.current) {
          setRadiantTurn(false);
          tempList[currIndex.current].pickImage2 = constants.urlCurrPick;
        } else {
          setRadiantTurn(true);
          tempList[currIndex.current].pickImage1 = constants.urlCurrPick;
        }
      }else{
        currIndex.current -= 1;
      }
      
  
      setSelectedHeroes([...selectedHeroes, filteredIndex]);
      setPickList(tempList);
    }
  
    const handleTimer = () => {
      if (userTeam == '' && pickTurn == '') {
        setModalOpened(true);
      } else {
        if (!isCountingDown) {
          setCountingDown(!isCountingDown);
          countRef.current = setInterval(() => {
            setCurrDraftTime((timer) => timer - 1);
          }, 1000);
        } else {
          setCountingDown(!isCountingDown);
          clearInterval(countRef.current);
        }
      }
    };
  
    function resetDraft() {
      window.location.reload();
    }
  
    const noHeroPicked = () => {
      if (pickList[currIndex.current].pickType == 'Pick') {
        let ind = Math.floor(Math.random() * 122);
        if (selectedHeroes.length > 0) {
          while (selectedHeroes.some((item) => item == allHeroes[ind].hero_id)) {
            ind = Math.floor(Math.random() * 122);
          }
        }
  
        pickAHero(
          constants.urlMainApi + allHeroes[ind].img,
          allHeroes[ind].hero_id,
          allHeroes[ind].localized_name
        );
      } else {
        resetTimer();
  
        const tempList = [...pickList];
  
        if (pickList[currIndex.current].pickOrder1 == currPick.current) {
          tempList[currIndex.current].pickImage1 = constants.urlSkippedPick;
          if (currPick.current > pickList[currIndex.current].pickOrder2) {
            currIndex.current += 1;
          }
        } else {
          tempList[currIndex.current].pickImage2 = constants.urlSkippedPick;
          if (currPick.current > pickList[currIndex.current].pickOrder1) {
            currIndex.current += 1;
          }
        }
  
        currPick.current += 1;
  
        // Add current pick indicator of next turn
        if (
          currPick.current <= 24 &&
          pickList[currIndex.current].pickOrder2 == currPick.current
        ) {
          setRadiantTurn(false);
          tempList[currIndex.current].pickImage2 = constants.urlCurrPick;
        } else {
          setRadiantTurn(true);
          tempList[currIndex.current].pickImage1 = constants.urlCurrPick;
        }
  
        setPickList(tempList);
      }
    };
  
    function secondsToMinutes(secs) {
      const newMin = Math.floor(secs / 60);
      const newSec = secs % 60;
  
      return (
        newMin.toString() +
        ':' +
        (newSec < 10 ? '0' + newSec.toString() : newSec.toString())
      );
    }
  
    return (
      <div className={classes.mainBody}>
        <HeaderMiddle activeTab={constants.drafterPageIndex} />
  
        <Modal
          opened={isModalOpened}
          onClose={() => setUserPreferences()}
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
          <Space h="sm" />
  
          <Button onClick={() => setUserPreferences()}>Confirm</Button>
        </Modal>

        {isLoading ? 
          (<ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#228BE6', '#228BE6', '#228BE6', '#228BE6', '#228BE6']}
          />) : 
          <div>
            <div className={classes.timerNavBar}>
              <div className={cx(classes.timerNavItems, classes.extraTime)}>
                <Text>Radiant</Text>
                <Text>{secondsToMinutes(radiantExtraTime)}</Text>
                <Text>Reserve Time</Text>
              </div>
              <div className={classes.timerNavItems}>
                <Text
                  size="xl"
                  weight={700}
                  style={{ color: isRadiantTurn ? 'green' : 'red' }}
                >
                  {isRadiantTurn ? 'Radiant ' : 'Dire '}
                  {pickList[currIndex.current].pickType}
                </Text>
                <Text size="xl" weight={300}>
                  {secondsToMinutes(currDraftTime)}
                </Text>
      
                <Group position="center" spacing="xs">
                  <Button onClick={handleTimer}>
                    {isCountingDown ? 'Pause' : 'Start'}
                  </Button>
                  <Button onClick={resetDraft}>Reset</Button>
                </Group>
              </div>
            <div className={cx(classes.timerNavItems, classes.extraTime)}>
            <Text>Dire</Text>
            <Text>{secondsToMinutes(direExtraTime)}</Text>
            <Text>Reserve Time</Text>
          </div>
        </div>
  
        <Space h="sm" />
  
        <TextInput
          // icon={<IconSearch size={18} stroke={1.5} />}
          radius="xl"
          size="md"
          placeholder="Search Heroes"
          rightSectionWidth={42}
          onChange={keyPress}
        />
        <Space h="sm" />
  
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
        </div></div>
        }

      </div>
    );
  }
  
  export default Drafter;
  