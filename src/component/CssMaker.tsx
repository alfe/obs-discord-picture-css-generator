import React from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import { useTranslation } from "react-i18next";
import cssObj, { imgAvatarStyle, setIconSpeakingStyle, setUsernameHidden, setUsernameHorizontal, setUsernameVertical } from '../lib/cssObj'
import { getCssText } from '../lib/cssText'
import DiscordIconPreview, { CustomStyle } from './DiscordIconPreview'
import SelectorToggleButtonGroup from './SelectorToggleButtonGroup'
import InputArea from './InputArea'
import SliderListItem from './SliderListItem'
import CssString from './CssString';
import InputUserIdImgUrlForm from './InputUserIdImgUrlForm';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import CheckBoxListItem from './CheckBoxListItem';
import tranceAlfe from './img/trance_alfe.png';
import tranceAlfeMouth from './img/trance_alfe_mouth.png';

const CssMaker = () => {
  const [styles, setStyles] = React.useState<CustomStyle>({
    voiceContainer: {},
    voiceStates: {
      display: 'flex',
      alignItems: 'flex-end',
      padding: '16px',
    },
    voiceState: {
      height: 'auto',
    },
    avatar: {
      filter: 'brightness(70%)',
    },
    avatarSpeaking: {
      position: 'relative',
      animation: '0ms infinite alternate ease-in-out null',
      filter: 'brightness(100%) drop-shadow(2px 2px 0px #43b581) drop-shadow(-2px -2px 0px #43b581) drop-shadow(-2px 2px 0px #43b581) drop-shadow(2px -2px 0px #43b581)',
    },
    user: {},
    name: { display: 'none' },
  });
  
  const [userIdImgStyles, setUserIdImgStyles] = React.useState({
    img0: {},
    img1: {},
    img2: {},
  });

  const [userIdImgUrls, setUserIdImgUrls] = React.useState<string[][]>([['', '', '']]);
  const [isSolo, setIsSolo] = React.useState(true);
  const [isHiddenName, setHiddenName] = React.useState(true);
  const { t } = useTranslation("translation", { keyPrefix: "css_maker" });

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
                key={`id-url-forms-${index}`}
                hasHelp={index === 0}
                defaultUserId={index === 0 ? '739000000000000000' : ''}
                defaultImgUrl={index === 0 ? tranceAlfe : ''}
                defaultMouthImgUrl={index === 0 ? tranceAlfeMouth : ''}
                onChange={(userId: string, imgUrl: string, mouthImgUrl?: string) => {
                  if (!userId || !imgUrl) return;
                  userIdImgUrls.splice(index, 1, [userId, imgUrl, mouthImgUrl || '']);
                  setUserIdImgUrls(userIdImgUrls);
                  imgAvatarStyle({
                    imgIndex: `img${index}`,
                    userId,
                    val: userIdImgUrls[index],
                    styles: userIdImgStyles,
                    setStyles: setUserIdImgStyles,
                  });
                }} />
            ))}
          </List>
          {!isSolo && (
            <Button
              onClick={() => {
                setUserIdImgUrls([...userIdImgUrls, ['', '']]);
              }}>
              追加
            </Button>
          )}
        </InputArea>

        <Box sx={{ m: 1 }} />

        <InputArea>
          <List>
            <SelectorToggleButtonGroup
              title={t("movement")}
              onChange={(val) => {
                setIconSpeakingStyle({val, styles, setStyles});
              }}
              options={[
                { value: 'border', label: t('border') },
                { value: 'light', label: t('blinking') },
                { value: 'jump', label: t('jump') },
              ]} />
            <SliderListItem
              title={t("speed_of_movement")}
              onChange={(val) => cssObj.iconSpeakingDuration({val, styles, setStyles})} />

            <CheckBoxListItem
              title="名前を隠す"
              onChange={(val: boolean) => {
                setHiddenName(val);
                setUsernameHidden({val, styles, setStyles});
              }} />
            {!isHiddenName && (<>
              <SliderListItem
                title={t("top_and_bottom")}
                onChange={(val) => setUsernameHorizontal({val, styles, setStyles})} />
              <SliderListItem
                title={t("left_right")}
                onChange={(val) => setUsernameVertical({val, styles, setStyles})} />
            </>)}
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
