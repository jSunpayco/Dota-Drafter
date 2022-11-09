import React = require('react');
import HeaderMiddle from '../components/HeaderMiddle';
import { constants } from '../Constants';
import {
  createStyles,
  Title,
  Text,
  Group,
  Accordion,
  Stepper,
  Container,
  ScrollArea,
  SimpleGrid,
} from '@mantine/core';
import { useState, useEffect, useRef } from 'react';

const useStyles = createStyles((theme) => ({
  accordionItem: {
    alignItems: 'center',
  },

  accordionImage: {
    maxWidth: '533px',
    height: '300px',
    position: 'relative',
    left: '100%',
    marginLeft: '-200%',
  },

  imageFrame: { overflow: 'hidden', textAlign: 'center', width: '100%' },

  accordionText: {
    fontSize: '18px',
    width: '100%',
    marginLeft: '20px',
  },
}));

function About() {
  const { classes, cx } = useStyles();

  // useEffect(() => {

  //   document.addEventListener('keydown', keyPress);
  //   return function cleanup() {
  //     document.removeEventListener('keydown', keyPress);
  //   };
  //   }
  // }, []);

  // function keyPress(event) {
  //   if (event.keyCode === 8) {
  //     setSample(sample.slice(0, -1));
  //   }
  //   // else if(event.target.innerHTML === 'enter'){
  //   //   setSample();
  //   // }
  //   else if (
  //     (event.keyCode >= 65 && event.keyCode <= 90) ||
  //     (event.keyCode >= 97 && event.keyCode <= 122)
  //   ) {
  //     currText += event.key;
  //     setSample(currText);
  //   }
  // }

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '150px' }}>
        <Group style={{ marginLeft: '100px' }}>
          <Title order={1} size={80}>
            Welcome to DOTA Drafter
          </Title>
          <Text size={25}>A web app that simulates DOTA 2's Captains Mode</Text>
        </Group>

        <Container size="xl" style={{ marginTop: '90px' }}>
          <Accordion
            defaultValue="customization"
            variant="contained"
            // style={{ minWidth: '1080px' }}
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <Title order={4}>What is DOTA 2 Captains Mode?</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid
                  cols={2}
                  className={classes.accordionItem}
                  spacing={50}
                >
                  <p className={classes.accordionText}>
                    {constants.captainsModeDesc}
                  </p>
                  <div className={classes.imageFrame}>
                    <img
                      className={classes.accordionImage}
                      src={
                        'https://www.animationxpress.com/wp-content/uploads/2022/02/3Pixotope-Dota2.png'
                      }
                    ></img>
                  </div>
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>
                <Title order={4}>Rules of drafting</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid
                  cols={2}
                  className={classes.accordionItem}
                  spacing={50}
                >
                  <p className={classes.accordionText}>{constants.howToPlay}</p>
                  <div className={classes.imageFrame}>
                    <img
                      style={{ transform: 'scale(1.3)', overflow: 'hidden' }}
                      className={classes.accordionImage}
                      src={
                        'https://steamuserimages-a.akamaihd.net/ugc/865111643819174254/8559DF87EC87F9C45BE2F654571D039D4D70FA18/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
                      }
                    ></img>
                  </div>
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>
                <Title order={4}>About the developer</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid
                  cols={2}
                  className={classes.accordionItem}
                  spacing={50}
                >
                  <p className={classes.accordionText}>
                    {constants.aboutMe}{' '}
                    <a href="https://github.com/jSunpayco/Dota-Drafter">here</a>
                  </p>
                  <div className={classes.imageFrame}>
                    <img
                      className={classes.accordionImage}
                      src={
                        'https://fs.hubspotusercontent00.net/hubfs/6426302/Imported_Blog_Media/263a75529a1752b75d64f9f21fd07c92-3-2.jpg'
                      }
                    ></img>
                  </div>
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </div>
  );
}

export default About;
