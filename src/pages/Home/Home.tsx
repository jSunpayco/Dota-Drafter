import * as React from 'react';
import HeaderMiddle from '../../components/HeaderMiddle.tsx';
import { constants } from '../../Constants.tsx';
import './home.css';
import {
  Title,
  Text,
  Group,
  Button
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';

function Home() {
  return (
    <div>
      <HeaderMiddle activeTab={constants.aboutPageIndex} />

      <div style={{ marginTop: '100px' }}>
        <Group className='title'>
          <Title order={1} size={80}>
            {constants.aboutTitle}
          </Title>
          <Text size={25}>{constants.aboutSubTitle}</Text>
          <Button component="a" href="/drafter" variant="outline" size="lg" leftIcon={<IconExternalLink size={20} />}>
            Start Drafting
          </Button>
        </Group>

        <div className='aboutDraftContainer'>
          <div className='aboutDraftCard'>
            <h2 style={{ textAlign: 'left' }}>{constants.about1Title}</h2>
            <p style={{ textAlign: 'justify' }}>{constants.about1Desc}</p>
            <img className='aboutDraftImg' src={constants.about1Img}></img>
          </div>
          <div className='aboutDraftCard'>
            <h2 style={{ textAlign: 'left' }}>{constants.about2Title}</h2>
            <p style={{ textAlign: 'justify' }}>{constants.about2Desc}</p>
            <img className='aboutDraftImg' src={constants.about2Img}></img>
          </div>
          <div className='aboutDraftCard'>
            <h2 style={{ textAlign: 'left' }}>{constants.about3Title}</h2>
            <p style={{ textAlign: 'justify' }}>{constants.about3Desc}</p>
            <img className='aboutDraftImg' src={constants.about3Img}></img>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
