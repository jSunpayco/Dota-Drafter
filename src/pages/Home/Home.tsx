import * as React from 'react';
import HeaderMiddle from '../../components/HeaderMiddle.tsx';
import { constants } from '../../Constants.tsx';
import './home.css';
import {
  createStyles,
  Title,
  Text,
  Group
} from '@mantine/core';
import { useRef, useState } from 'react';
import {ColorRing} from 'react-loader-spinner';

const useStyles = createStyles((theme) => ({
}));

function Home() {
  const { classes, cx } = useStyles();
  const [isLoading, setLoading] = useState(true)
  
  const summaryRef = useRef(null)
  const rulesRef = useRef(null)
  const devRef = useRef(null)

  function scrollBack(myRef){
    myRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '80px' }}>
        <Group className='title'>
          <Title order={1} size={80}>
            {constants.aboutTitle}
          </Title>
          <Text size={25}>{constants.aboutSubTitle}</Text>
        </Group>

        <div className={'contents'}>
          <div className='naviBarContainer'>
            <ul className='naviBar'>
              <li onClick={() => scrollBack(summaryRef)} className='naviBarItem'><a className='naviBarText'>{constants.aboutAccordion1Title}</a></li>
              <li onClick={() => scrollBack(rulesRef)} className='naviBarItem'><a className='naviBarText'>{constants.aboutAccordion2Title}</a></li>
              <li onClick={() => scrollBack(devRef)} className='naviBarItem'><a className='naviBarText'>{constants.aboutAccordion3Title}</a></li>
            </ul>
          </div>

          <div className='contentsItem'>
            
            <div className={'scrollGroup'} ref={summaryRef}>
              <div className='scrollContent'>
                <Title order={1}>{constants.aboutAccordion1Title}</Title>
                <p>
                  {constants.captainsModeDesc1}
                </p> 
                <p>
                  {constants.captainsModeDesc2}
                </p> 
                <p id='lastParagraph'>
                  {constants.captainsModeDesc3}
                </p>
              </div>
              <div className='scrollImage'>
                <img
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
            </div>
            
            <div className={'scrollGroup'} ref={rulesRef}>
              <div className='scrollContent'>
                <Title order={1}>{constants.aboutAccordion2Title}</Title>
                <p>
                  {constants.howToPlay1}
                </p> 
                <p>
                  {constants.howToPlay2}
                </p> 
                <p id='lastParagraph'>
                  {constants.howToPlay3}
                </p>
              </div>
              <div className='scrollImage'>
                <img
                  style={{visibility: isLoading ? "hidden" : "visible" }}
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
            </div>
            
            <div className={'scrollGroup'} ref={devRef} data-scroll>
              <div className='scrollContent'>
                <Title order={1}>{constants.aboutAccordion3Title}</Title>
                <p>
                  {constants.aboutMe1}
                </p>
                <p>
                  {constants.aboutMe2}
                </p>
                <p id='lastParagraph'>
                  {constants.aboutMe3} <a href={constants.githubUrl}>here</a>
                </p>
              </div>
              <div className='scrollImage'>
                <img
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
            </div>
      
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
