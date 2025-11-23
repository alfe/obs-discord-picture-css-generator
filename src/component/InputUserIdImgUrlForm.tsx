import React from 'react'
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import WhatIsDiscordUserIdButton from './WhatIsDiscordUserIdButton';
import tranceAlfeMouth from './img/trance_alfe_mouth.png';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

type InputUserIdImgUrlFormProps = {
  name: string;
  hasHelp?: boolean;
  onChange: (userId: string, imgUrl: string, mouthImgUrl: string, memo: string) => void;
};
const InputUserIdImgUrlForm = ({ name, hasHelp, onChange }: InputUserIdImgUrlFormProps) => {
  const [userId, setUserId] = React.useState(localStorage.getItem(`${name}-user-id`) || '');
  const [imgUrl, setImgUrl] = React.useState(localStorage.getItem(`${name}-img-url`) || '');
  const [mouthImgUrl, setMouthImgUrl] = React.useState(localStorage.getItem(`${name}-mouth-img-url`) || '');
  const [memo, setMemo] = React.useState(localStorage.getItem(`${name}-memo`) || '');
  const { t } = useTranslation("translation", { keyPrefix: "input_user_id_img_url_form" });

  React.useEffect(() => {
    onChange(userId, imgUrl, mouthImgUrl, memo);
  }, [userId, imgUrl, mouthImgUrl, memo])

  const handleUserIdChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event?.target?.value) {
      localStorage.removeItem(`${name}-user-id`);
    } else {
      localStorage.setItem(`${name}-user-id`, event?.target?.value || '');
    }
    setUserId(event?.target?.value || '');
  };
  const handleImgUrl: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event?.target?.value) {
      localStorage.removeItem(`${name}-img-url`);
    } else {
      localStorage.setItem(`${name}-img-url`, event?.target?.value || '');
    }
    setImgUrl(event?.target?.value || '');
  };
  const handleMouthImgUrl: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event?.target?.value) {
      localStorage.removeItem(`${name}-mouth-img-url`);
    } else {
      localStorage.setItem(`${name}-mouth-img-url`, event?.target?.value || '');
    }
    setMouthImgUrl(event?.target?.value || '');
  };
  const handleMemo: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event?.target?.value) {
      localStorage.removeItem(`${name}-memo`);
    } else {
      localStorage.setItem(`${name}-memo`, event?.target?.value || '');
    }
    setMemo(event?.target?.value || '');
  };

  const getMouthImgUrl = () => {
    if (imgUrl === '' && mouthImgUrl === '') return tranceAlfeMouth;
    if (mouthImgUrl !== '') return mouthImgUrl;
    return mouthImgUrl;
  }

  return (
    <>
      {!hasHelp && <Divider sx={{ my: 2 }} />}

      <ListItem
        sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 2 }}
      >
        <TextField
          label={t("discord_user_id")}
          sx={{ width: '12rem' }}
          variant="outlined"
          helperText={hasHelp ? (<WhatIsDiscordUserIdButton />) : ''}
          value={userId}
          onChange={handleUserIdChange}
          slotProps={{ inputLabel: { shrink: true } }}
          placeholder="000000000000000000" />
        <TextField
          color="secondary"
          fullWidth
          label={t("memo")}
          variant="outlined"
          value={memo}
          onChange={handleMemo}
          helperText={t("memo_help")}
          slotProps={{ inputLabel: { shrink: true } }}
          placeholder={t("memo_placeholder")} />
      </ListItem>
      <ListItem
        sx={{
          display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 2,
        }}
      >
        <TextField
          label={t("img_url")}
          fullWidth
          variant="outlined"
          value={imgUrl}
          onChange={handleImgUrl}
          helperText={t("img_url_help")}
          slotProps={{ inputLabel: { shrink: true } }}
          placeholder="https://cdn.discordapp.com/.../image.jpg" />
        <TextField
          color="secondary"
          fullWidth
          sx={{ '.MuiInputBase-root.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, .2)'}}}
          label={t("mouth_img_url")}
          variant="outlined"
          value={mouthImgUrl}
          onChange={handleMouthImgUrl}
          disabled={!imgUrl}
          helperText={t("mouth_img_url_help")}
          slotProps={{ inputLabel: { shrink: true } }}
          placeholder="https://example.com/image.jpg" />
      </ListItem>

      <MouthAnimationStyle userId={userId || '000000000000000000'} mouthImgUrl={getMouthImgUrl()} />
    </>
  );
};
export default InputUserIdImgUrlForm;

type MouthAnimationStyleProps = {
  userId: string;
  mouthImgUrl: string;
};
const MouthAnimationStyle = React.memo((props: MouthAnimationStyleProps) => {
    if (!props.userId || !props.mouthImgUrl) return null;
    return (
      <style>
        {`@keyframes mouth-${props.userId} {
            0% {
            }
            50%{
              content: url("${props.mouthImgUrl}")
            }
            100% {
            }
        }`}
      </style>
    );
  }, (p, n) => p.userId === n.userId && p.mouthImgUrl === n.mouthImgUrl);
