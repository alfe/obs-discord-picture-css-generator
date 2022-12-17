import React from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import { useTranslation } from "react-i18next";
import cssObj, { imgAvatarStyle } from '../lib/cssObj'
import { getCssText } from '../lib/cssText'
import DiscordIconPreview, { CustomStyle } from './DiscordIconPreview'
import SelectorListItem from './SelectorListItem'
import InputArea from './InputArea'
import SliderListItem from './SliderListItem'
import CssString from './CssString';
import InputUserIdImgUrlForm from './InputUserIdImgUrlForm';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import CheckBoxListItem from './CheckBoxListItem';
import tranceAlfe from './img/trance_alfe.png';

const CssMaker = () => {
  const [styles, setStyles] = React.useState<CustomStyle>({
    voiceContainer: {},
    voiceStates: {
      display: 'flex',
    },
    voiceState: {
      height: 'auto',
    },
    avatar: {
      filter: 'brightness(70%)',
    },
    avatarSpeaking: {
      position: 'relative',
      filter: 'brightness(100%) drop-shadow(2px 2px 0px #43b581) drop-shadow(-2px -2px 0px #43b581) drop-shadow(-2px 2px 0px #43b581) drop-shadow(2px -2px 0px #43b581)',
      borderColor: 'transparent', // !important
    },
    name: {
      display: 'none',
    },
  });
  
  const [userIdImgStyles, setUserIdImgStyles] = React.useState({
    img0: {},
    img1: {},
    img2: {},
  });

  const [userIdImgUrls, setUserIdImgUrls] = React.useState<string[][]>([['', '']]);
  const [activeMove, setActiveMove] = React.useState(false);
  const [isSolo, setIsSolo] = React.useState(false);
  const { t } = useTranslation("translation", { keyPrefix: "css_maker" });
  console.log({styles, userIdImgStyles, userIdImgUrls})

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <InputArea>
          <Typography sx={{ pl: 2 }} align="left">立ち絵変更ユーザ</Typography>
          <List>
            <CheckBoxListItem
              title="ひとりだけ表示"
              onChange={(value: boolean) => {
                setIsSolo(value);
                setUserIdImgUrls([userIdImgUrls[0]]);
              }} />
            {userIdImgUrls.map((_: any, index: number) => (
              <InputUserIdImgUrlForm
                hasHelp={index === 0}
                defaultUserId={index === 0 ? '739000000000000000' : ''}
                defaultImgUrl={index === 0 ? tranceAlfe : ''}
                onChange={(userId: string, imgUrl: string) => {
                  if (!userId || !imgUrl) return;
                  userIdImgUrls.splice(index, 1, [userId, imgUrl]);
                  setUserIdImgUrls(userIdImgUrls);
                  imgAvatarStyle({
                    imgIndex: `img${index}`,
                    val: userIdImgUrls[index],
                    styles: userIdImgStyles,
                    setStyles: setUserIdImgStyles,
                  });
                }} />
            ))}
          </List>
          <Button
            disabled={isSolo}
            onClick={() => {
            setUserIdImgUrls([...userIdImgUrls, ['', '']]);
          }}>
            追加
          </Button>
        </InputArea>

        <Box sx={{ m: 1 }} />

        <InputArea>
          <List>
            <SelectorListItem
              title={t("movement")}
              onChange={(val) => {
                cssObj.iconSpeaking({val, styles, setStyles});
                setActiveMove(val !== 'border');
              }}
              options={[
                { value: 'border', label: t('border') },
                { value: 'light', label: t('blinking') },
                { value: 'jump', label: t('jump') },
              ]} />
            <SliderListItem
              title={t("speed_of_movement")}
              disabled={!activeMove}
              onChange={(val) => cssObj.iconSpeakingDuration({val, styles, setStyles})} />
          </List>
        </InputArea>
      </Grid>
      <Grid item md={6} xs={12} sx={{ overflow: 'hidden' }}>
        <DiscordIconPreview isSolo={isSolo} styles={styles} userIdImgStyles={userIdImgStyles} />
      </Grid>
      <Grid item xs={12}>
        <CssString value={getCssText(styles, userIdImgUrls, isSolo)} />
      </Grid>
    </Grid>
  );
};
export default CssMaker;
