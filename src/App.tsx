import CssMaker from './component/CssMaker'
import './App.css'
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import TutorialButton from './component/TutorialButton';
import { useEffect } from 'react';

function App() {
  return (
    <div className='App-content'>
      <Header />
      <Container>
        <CssMaker />
      </Container>
      <Footer />
    </div >
  );
};
export default App

const Header = () => {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "header" });
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    // location.replace(`${location.origin}/${language === 'ja' ? '' : language}`)
  };
  const setLanguage = () => {
    changeLanguage('ja');

    // const language = i18n.language;
    // if ((location.pathname === '' || location.pathname === '/') && language === 'ja') {
    //   return;
    // }
    // if (location.pathname === '/ja') {
    //   changeLanguage('ja');
    // }
    // if ((location.pathname !== '' && location.pathname !== '/') && location.pathname !== '/ja' && (location.pathname.substring(1) !== language)) {
    //   changeLanguage(location.pathname.substring(1));
    // }
  }
  useEffect(() => {
    setLanguage();
  }, []);

  return (
    <header>
      <Box sx={{ m: 5 }}>
        {/* <ButtonGroup sx={{
          position: 'absolute',
          right: '2rem',
          top: '1rem',
        }}>
          <Button
            variant={i18n.language==="ja" ? "contained" : "outlined"}
            onClick={() => changeLanguage("ja")}>
              日本語
          </Button>
          <Button
            variant={i18n.language==="en" ? "contained" : "outlined"}
            onClick={() => changeLanguage("en")}>
              English
          </Button>
        </ButtonGroup> */}
        <Typography align="center" component="h1" variant="h3" paragraph>
          <>{t("title")}</>
        </Typography>
        <Container>
          <Typography align="center" paragraph>
            <>{t("title_anno")}</>
          </Typography>
          <Typography align="center" paragraph variant="caption">
            <>※ 2023.04.11 立ち絵未設定の人の表示/非表示を切替できるようにしました</> / 
            <a href="https://obs-discord-icon.alfebelow.com/">アイコンに見た目に変えたいときはこちら</a> /
            <a href="https://obs-discord-text.alfebelow.com/">テキストチャンネルの見た目を変えたいときはこちら</a>
          </Typography>
          <TutorialButton />
        </Container>
      </Box>
    </header>
  );
};

const Footer = () => {
  const { t } = useTranslation("translation", { keyPrefix: "footer" });
  return (
    <footer className='App-footer'>
      <p>
        <>
          解説動画 (
            <a href='https://www.nicovideo.jp/watch/sm41544646' target='_blank' >
              ニコニコ動画
            </a>
            /
            <a href='https://www.youtube.com/watch?v=kMxfhHgI2OA' target='_blank' >
              Youtube
            </a>)
        </>
      </p>
      <p>
        made by <a href='https://twitter.com/alfe_below' target='_blank' >@alfe_below</a>
        / <a href='https://github.com/alfe/obs-discord-picture-css-generator' target='_blank' >GitHub</a>
      </p>
    </footer>
  );
};
