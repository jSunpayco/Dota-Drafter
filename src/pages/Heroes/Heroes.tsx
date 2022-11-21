import {
    SimpleGrid,
    createStyles,
    Image,
    Text,
    Header,
    Space,
    Modal,
  } from '@mantine/core';
  import './heroes.css';
  import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
  import React from 'react';
  import HeaderMiddle from '../../components/HeaderMiddle.tsx';
  import { useEffect, useState, useMemo } from 'react';
  import axios from 'axios';
  import { constants } from '../../Constants.tsx';
  
  const useStyles = createStyles((theme) => ({  
    container: {
      minWidth: 500,
      marginTop: '100px',
      marginLeft: '10%',
      marginRight: '10%'
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
      float: 'right',
      position: 'relative',
      top: '5px',
      right:'5px',
      transition: 'all 1000ms ease',
    },

    dropDownList:{
      display: 'none',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      width: '200px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      border: 'solid',
      borderWidth: '2px',
    },
  
    iFrameDiv: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      paddingTop: '56.25%'
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

    const [rolesSelected, setRolesSelected] = useState<any[]>([]);
    
    const attribtues = [...new Set(heroStatus.map((Val) => Val.primary_attr))];
    const atkTypes = [...new Set(heroStatus.map((Val) => Val.attack_type))];
    
    //Use effects
    useEffect(() => {
      fetchHeroStatus();
    }, []);

    useEffect(() => {
      filterRoles();
    }, [rolesSelected]);
    
    // get appropriate filter icon
    function attrUrl(attr) {
      if (attr == 'int') return constants.urlIntelligence;
      else if (attr == 'agi') return constants.urlAgility;
      else return constants.urlStrength;
    }
  
    function attackUrl(atk) {
      if (atk == 'Ranged') return constants.urlRanged;
      else return constants.urlMelee;
    }
    
    // Fetch from API
    const fetchHeroStatus = () => {
      axios.get('https://dota-drafter.onrender.com/heroStatus')
      .then((res) => {
        setHeroStatus(res.data)
        setHeroStatusFiltered(res.data)
      })
      .catch((err) => console.log("Oh no! " + err)
      )
    };
    
    // Apply filter
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

    function addSelectedRoles(role){
      let roleLen = rolesSelected.length;

      if(rolesSelected.includes(role)){
        let newRoles = rolesSelected.filter((item) => item !== role);
        setRolesSelected(newRoles)
      }else{
        setRolesSelected(rolesSelected => [...rolesSelected, role])
      }
    }

    function filterRoles() {
      if(rolesSelected.length == 0){
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
      }else{
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
          .filter((newItem) =>{
            return rolesSelected.every((currRole) => newItem.roles.includes(currRole))
          });
        
        setHeroStatusFiltered(newItem);
      }
    }
    
    // Display heroes
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
    
    // Display filter icons
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

    // Misc
    const dropDownOptions = heroRoles
      .map((role) => (
           <div 
            className={(rolesSelected.includes(role) ? cx('roleOption', 'selectedRole') : 'roleOption')} 
            onClick={() => addSelectedRoles(role)}
            >
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
              <div className={dropDownOpened ? cx(classes.dropDown, classes.dropDownClicked) : classes.dropDown}>
                <p className={classes.dropDownText} onClick={() => setDropDownOpen(!dropDownOpened)}>
                  {rolesSelected.length} Roles Selected
                  {dropDownOpened? <AiFillCaretUp className={classes.dropDownArrow}/>:
                  <AiFillCaretDown className={classes.dropDownArrow}/>}
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
  