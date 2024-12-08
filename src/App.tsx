import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import TutorialButton from './component/TutorialButton';
import CssMaker from './component/CssMaker'
import theme from './theme';
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App-content'>
        <Header />
        <Container>
          <CssMaker />
        </Container>
        <Footer />
      </div >
    </ThemeProvider>
  );
};
export default App

const Header = () => {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "header" });
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const setLanguage = () => {
    changeLanguage('ja');
  }
  useEffect(() => {
    setLanguage();
  }, []);

  return (
    <header>
      <Box sx={{ m: 5 }}>
        <Typography align="center" component="h1" variant="h3" paragraph>
          <>{t("title")}</>
        </Typography>
        <Container>
          <Typography align="center" paragraph>
            <>{t("title_anno")}</>
          </Typography>
          <Typography align="center" paragraph variant="caption">
            <a href="https://obs-discord-icon.alfebelow.com/">アイコンの見た目に変えたいときはこちら</a>&emsp;/&emsp; 
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
          {t("commentary_article")} (
          <a href='https://www.nicovideo.jp/watch/sm41544646' target='_blank' >
            <>{t("niconico")}</>
          </a>
          /
          <a href='https://www.youtube.com/watch?v=kMxfhHgI2OA' target='_blank' >
            <>{t("youtube")}</>
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
