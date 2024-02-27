import React from 'react'
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import cssObj, { imgAvatarStyle, setIconSpeakingStyle, setUsernameHidden, setUsernameHorizontal, setUsernameVertical } from '../lib/cssObj'
import { getCssText } from '../lib/cssText'
import { getCssKeyFrames } from '../lib/cssKeyFrames';
import DiscordIconPreview, { CustomStyle } from './DiscordIconPreview'
import SelectorToggleButtonGroup from './SelectorToggleButtonGroup'
import InputArea from './InputArea'
import SliderListItem from './SliderListItem'
import CssString from './CssString';
import InputUserIdImgUrlForm from './InputUserIdImgUrlForm';
import CheckBoxListItem from './CheckBoxListItem';
import ColorPickerListItem from './ColorPickerListItem';
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
      marginBottom: '0px',
    },
    avatar: {
      filter: 'brightness(70%)',
    },
    avatarSpeaking: {
      position: 'relative',
      animation: '0ms infinite alternate ease-in-out null',
      filter: 'brightness(100%)',
      animationDuration: `750ms`,
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
  const [speakingStyles, setSpeakingStyles] = React.useState<string[]>(JSON.parse(localStorage.getItem('movement') || '["light","jump"]'));
  const [animationColor, setAnimationColor] = React.useState('#FFFFFF');
  const [isSolo, setIsSolo] = React.useState(true);
  const [isHasMaxWidth, setIsHasMaxWidth] = React.useState(true);
  const [isNotSetShow, setIsNotSetShow] = React.useState(false);
  const [isHiddenName, setHiddenName] = React.useState(true);
  const { t } = useTranslation("translation", { keyPrefix: "css_maker" });

  React.useEffect(() => {
    setIconSpeakingStyle({ val: speakingStyles, styles, setStyles });
  }, []);

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
                name={`id-url-forms-${index}`}
                hasHelp={index === 0}
                onChange={(userId: string, imgUrl: string, mouthImgUrl: string, memo: string) => {
                  console.log(`${userId},${imgUrl},${mouthImgUrl}, ${memo}`);
                  if (!userId) userId = '000000000000000000'
                  if (!imgUrl || imgUrl.length === 0) imgUrl = tranceAlfe
                  userIdImgUrls.splice(index, 1, [userId, imgUrl, mouthImgUrl || '', memo || '']);
                  setUserIdImgUrls(userIdImgUrls);
                  imgAvatarStyle({
                    imgIndex: `img${index}`,
                    userId,
                    isHasMaxWidth,
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
        <AnimationStyle
          speakingStyles={speakingStyles}
          animationColor={animationColor} />
        <Box sx={{ m: 1 }} />

        <InputArea>
          <List>
            <SelectorToggleButtonGroup
              title={t("movement")}
              name="movement"
              value={speakingStyles}
              onChange={(val) => {
                setSpeakingStyles(val);
                setIconSpeakingStyle({val, styles, setStyles});
              }}
              options={[
                { value: 'border', label: t('border') },
                { value: 'light', label: t('blinking') },
                { value: 'jump', label: t('jump') },
              ]} />
            <SliderListItem
              title={t("speed_of_movement")}
              name="speed_of_movement"
              onChange={(val) => cssObj.iconSpeakingDuration({val, styles, setStyles})} />
            {(speakingStyles.includes('light') || speakingStyles.includes('border')) && (
              <ColorPickerListItem
                title="枠・後光の色"
                value={animationColor}
                onChange={(value) => {
                  setAnimationColor(`${value}`);
                }} />
            )}

            <CheckBoxListItem
              title="名前を隠す"
              onChange={(val: boolean) => {
                setHiddenName(val);
                setUsernameHidden({val, styles, setStyles});
              }} />
            <CheckBoxListItem
              title="静かな人を暗くする"
              onChange={(val: boolean) => {
                setStyles({
                  ...styles,
                  avatar: {
                    ...styles.avatar,
                    filter: val ? 'brightness(70%)' : 'brightness(100%)',
                  },
                })
              }} />
            {!isHiddenName && (<>
              <SliderListItem
                title={t("top_and_bottom")}
                onChange={(val) => setUsernameHorizontal({val, styles, setStyles})} />
              <SliderListItem
                title={t("left_right")}
                onChange={(val) => setUsernameVertical({val, styles, setStyles})} />
            </>)}

            <Divider />

            <FoldingMenu title="高度なオプション">
              <CheckBoxListItem title="画像の大きさを制限" onChange={(val => {
                setIsHasMaxWidth(val)
              })}/>
              <CheckBoxListItem title="立ち絵未設定の人を表示" disabled={isSolo} onChange={(val => {
                setIsNotSetShow(val)
              })}/>
            </FoldingMenu>
          </List>
        </InputArea>
      </Grid>
      <Grid item md={6} xs={12} sx={{ overflow: 'hidden' }}>
        <DiscordIconPreview
          isSolo={isSolo}
          styles={styles}
          userIdImgStyles={userIdImgStyles} />
      </Grid>
      <Grid item xs={12}>
        <CssString value={
          getCssText({
            styles,
            userIdImgUrls,
            isSolo,
            speakingStyles,
            animationColor,
            isHasMaxWidth,
            isNotSetShow,
          })} />
      </Grid>
    </Grid>
  );
};
export default CssMaker;

type AnimationStyleProps = {
  speakingStyles: string[];
  animationColor: string;
};
const AnimationStyle = ((props: AnimationStyleProps) => {
  if ((props.speakingStyles || []).length === 0 || !props.animationColor) return null;
  return (
    <><style>{getCssKeyFrames(props.speakingStyles, props.animationColor)}</style></>
  );
});

const FoldingMenu = ({ title, children }: { title: string; children: React.ReactNode; }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ListItemButton
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => setOpen(!open)}
      >
        <FormLabel component="legend">{title}</FormLabel>
        <Box sx={{ width: 250, textAlign: 'right' }}>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
      </ListItemButton>
      
      <Box sx={!open ? { display: 'none' } : { ml: 4 }}>
        {children}
      </Box>
    </>
  );
}