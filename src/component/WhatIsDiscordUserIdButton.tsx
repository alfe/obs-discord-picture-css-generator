import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Box from '@mui/material/Box';
import idCopy from './img/id_copy.jpg';
import discordSettingDetail from './img/discord-setting-detail.jpg';
import discordUserSetting from './img/discord-user-setting.jpg';
import Typography from '@mui/material/Typography';

/**
 * DiscordユーザIDとは？のボタンとダイアログ
 */
const WhatIsDiscordUserIdButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Box sx={{ textAlign: 'right', mx: -2, display: 'block' }} component="span">
        <Button onClick={() => { setOpen(true); }} sx={{ margin: '0 0 0 auto', fontSize: '.8em', alignItems: 'flex-end' }}>
          <HelpOutlineIcon fontSize="small" />DiscordユーザIDとは
        </Button>
      </Box>
      <Dialog open={open} onClose={() => { setOpen(false); }}>
        <DialogTitle>DiscordユーザIDとは？</DialogTitle>
        <DialogContent>
          <AboutDiscordUserIdDialogContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default WhatIsDiscordUserIdButton;

const AboutDiscordUserIdDialogContent = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      ディスコードサーバーのメンバーを右クリックすると出てくるメニューから、「IDをコピー」をクリックで取れるIDのことです
      <Box sx={{ textAlign: 'center', m: 2 }}>
        <img src={idCopy} alt="メンバーを右クリックしてIDをコピー" />
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Button onClick={() => { setOpen(true); }}>
          <HelpOutlineIcon />「IDをコピー」がでない
        </Button>
      </Box>

      <Dialog maxWidth="lg" open={open} onClose={() => { setOpen(false); }}>
        <DialogTitle>「IDをコピー」を出すには</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Discordで「開発者モード」を有効にすると表示ができるようになります。
          </Typography>

          <Typography>
            ユーザー設定を開いてから
          </Typography>
          <Box sx={{ textAlign: 'center', m: 2 }}>
            <img src={discordUserSetting} alt="Discordの左下からユーザー設定を開く" />
          </Box>

          <Typography>
            詳細設定の開発モードにチェックを入れると有効になります。
          </Typography>
          <Box sx={{ textAlign: 'center', m: 2 }}>
            <img src={discordSettingDetail} alt="詳細設定を開き、開発モードの欄をチェック" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
