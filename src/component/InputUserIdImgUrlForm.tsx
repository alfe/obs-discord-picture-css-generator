import React from 'react'
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import WhatIsDiscordUserIdButton from './WhatIsDiscordUserIdButton';
import tranceAlfeMouth from './img/trance_alfe_mouth.png';

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
      <ListItem
        sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 2 }}
      >
        <TextField
          label="DiscordユーザID *"
          sx={{ width: '12rem' }}
          variant="outlined"
          helperText={hasHelp ? (<WhatIsDiscordUserIdButton />) : ''}
          value={userId}
          onChange={handleUserIdChange}
          InputLabelProps={{ shrink: true }}
          placeholder="000000000000000000" />
        <TextField
          color="secondary"
          fullWidth
          label="メモ書き"
          variant="outlined"
          value={memo}
          onChange={handleMemo}
          helperText="※ なくてもOK"
          InputLabelProps={{ shrink: true }}
          placeholder="ねこさん立ち絵" />
      </ListItem>
      <ListItem
        sx={{
          display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 2,
          borderBottom: '1px solid #DDD',
        }}
      >
        <TextField
          label="画像URL *"
          fullWidth
          variant="outlined"
          value={imgUrl}
          onChange={handleImgUrl}
          InputLabelProps={{ shrink: true }}
          helperText="Discordに貼った画像のURL"
          placeholder="https://cdn.discordapp.com/.../image.jpg" />
        <TextField
          color="secondary"
          fullWidth
          sx={{ '.MuiInputBase-root.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, .2)'}}}
          label="口パク画像URL"
          variant="outlined"
          value={mouthImgUrl}
          onChange={handleMouthImgUrl}
          disabled={!imgUrl}
          helperText="※ なくてもOK"
          InputLabelProps={{ shrink: true }}
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
