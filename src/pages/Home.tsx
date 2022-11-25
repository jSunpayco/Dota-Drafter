import * as React from 'react';
import HeaderMiddle from '../components/HeaderMiddle.tsx';
import { constants } from '../Constants.tsx';
import {
  createStyles,
  Title,
  Text,
  Group,
  Accordion,
  Container,
  SimpleGrid,
} from '@mantine/core';
import {ColorRing} from 'react-loader-spinner';

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

  imageFrame: { 
    overflow: 'hidden', 
    textAlign: 'center', 
    width: '100%' 
  },

  accordionText: {
    fontSize: '18px',
    width: '100%',
    marginLeft: '20px',
  },
}));

function Home() {
  const { classes, cx } = useStyles();
  const [isLoading, setLoading] = React.useState(true)

  function finishedLoading(){
    setLoading(false)
    console.log("done")
  }

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '80px' }}>
        <Group style={{ marginLeft: '100px' }}>
          <Title order={1} size={80}>
            {constants.aboutTitle}
          </Title>
          <Text size={25}>{constants.aboutSubTitle}</Text>
        </Group>

        <Container size="xl" style={{ marginTop: '30px' }}>
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
                        onLoad={() => setLoading(false)}
                        style={{visibility: isLoading ? "hidden" : "visible"}}
                      ></img>
                      <ColorRing
                          visible={isLoading}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#228BE6', '#228BE6', '#228BE6', '#228BE6', '#228BE6']}
                        />
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
                        style={{ transform: 'scale(1.3)', overflow: 'hidden', visibility: isLoading ? "hidden" : "visible" }}
                        className={classes.accordionImage}
                        src={constants.aboutAccordion2Image}
                        onLoad={() => setLoading(false)}
                      ></img>
                      <ColorRing
                          visible={isLoading}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#228BE6', '#228BE6', '#228BE6', '#228BE6', '#228BE6']}
                        />
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
                        onLoad={() => setLoading(false)}
                        style={{visibility: isLoading ? "hidden" : "visible"}}
                      ></img>
                      <ColorRing
                          visible={isLoading}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#228BE6', '#228BE6', '#228BE6', '#228BE6', '#228BE6']}
                        />
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
