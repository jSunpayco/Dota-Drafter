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
  
    inner: {
      height: 60,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    filterOptions:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    dropDown:{
      border: 'solid',
      borderWidth: '2px',
      borderColor: 'black',
      width: '200px',
      borderRadius: '25px',
      display: 'table',
      cursor: 'pointer',
      zIndex: 1
    },

    dropDownClicked:{
      borderColor: '#228BE6',
      display: 'table'
    },

    dropDownText:{
      fontSize: '16px',
      marginLeft: '3px',
      // background: 'crimson',
      margin: '4px',
      userSelect: 'none'
    },

    dropDownArrow:{
      border: 'solid black',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '3px',
      float: 'right',
      position: 'relative',
      top: '5px',
      right:'5px',
      // bottome: '50%'
    },

    dropDownList:{
      display: 'none',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      width: '200px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      // padding: '12px 16px',
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    roleOption:{
      transition: 'all 150ms ease',
      padding: '12px 16px',
  
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(34, 139, 230, 0.8)',
      },
    },
  
    iFrameDiv: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      paddingTop: '56.25%',
      transform: 'rotate(45deg)'
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

    const [dropDownOpened, setDropDownOpen] = useState(false)
  
    const [currAttribute, setCurrAttribute] = useState('All');
    const [currAttackType, setCurrAttackType] = useState('All');

    const heroRoles = ['Carry', 'Support', 'Nuker', 'Disabler', 'Jungler', 'Escape', 'Pusher', 'Initiator']
  
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
          className={'filterImage'}
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
          className={'filterImage'}
          onClick={() => filterAttackTypes(atk)}
          mx={5}
        >
          {atk}
        </Image>
      );
    });

    const dropDownOptions = heroRoles
      .map((role) => (
           <div className={classes.roleOption}>
            {role}
           </div>
      ));
  
    function openModal(heroName) {
      setModalOpened(true);
      setHeroPicked(heroName);
    }
  
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
  
            <div className={classes.filterOptions}>
              <Text size={22} weight={300}>
                Attribute
              </Text>
              <div className={classes.filterOptions}>{attributeFilters}</div>
            </div>
            <div className={classes.filterOptions}>
              <Text size="xl" weight={300}>
                Attack Type
              </Text>
              <div className={classes.filterOptions}>{attackTypeFilters}</div>
            </div>
            <div className={classes.filterOptions}>
              <Text style={{marginRight:'10px'}} size={22} weight={300}>
                Roles
              </Text> 
              <div className={dropDownOpened ? cx(classes.dropDown, classes.dropDownClicked) : classes.dropDown} 
              onClick={() => setDropDownOpen(!dropDownOpened)}>
                <p className={classes.dropDownText}>0 Roles Selected 
                  <i className={classes.dropDownArrow} style={{WebkitTransform: 'rotate(45deg)'}}></i>
                </p>
                <div className={dropDownOpened ? cx(classes.dropDownList, classes.dropDownClicked) : classes.dropDownList}>
                  {dropDownOptions}
                </div>
              </div>
            </div>
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
  