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

function Home() {
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
            {constants.aboutTitle}
          </Title>
          <Text size={25}>{constants.aboutSubTitle}</Text>
        </Group>

        <Container size="xl" style={{ marginTop: '90px' }}>
          <Accordion
            defaultValue="customization"
            variant="contained"
            transitionDuration={650}
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <Title order={4}>{constants.aboutAccordion1Title}</Title>
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
                      src={constants.aboutAccordion1Image}
                    ></img>
                  </div>
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>
                <Title order={4}>{constants.aboutAccordion2Title}</Title>
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
                      src={constants.aboutAccordion2Image}
                    ></img>
                  </div>
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>
                <Title order={4}>{constants.aboutAccordion3Title}</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid
                  cols={2}
                  className={classes.accordionItem}
                  spacing={50}
                >
                  <p className={classes.accordionText}>
                    {constants.aboutMe} <a href={constants.githubUrl}>here</a>
                  </p>
                  <div className={classes.imageFrame}>
                    <img
                      className={classes.accordionImage}
                      src={constants.aboutAccordion3Image}
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

export default Home;
