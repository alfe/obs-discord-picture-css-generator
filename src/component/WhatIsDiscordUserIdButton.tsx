import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation("translation", { keyPrefix: "what_is_discord_user_id_button" });
  return (
    <>
      <Box sx={{ textAlign: 'right', mx: -2, display: 'block' }} component="span">
        <Button onClick={() => { setOpen(true); }} sx={{ margin: '0 0 0 auto', fontSize: '.8em', alignItems: 'flex-end' }}>
          <HelpOutlineIcon fontSize="small" />{t("discord_user_id_and_is")}
        </Button>
      </Box>
      <Dialog open={open} onClose={() => { setOpen(false); }}>
        <DialogTitle>{t("discord_user_id_and_is")}</DialogTitle>
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
  const { t } = useTranslation("translation", { keyPrefix: "what_is_discord_user_id_button" });
  return (
    <>
      {t("discord_user_id_and_is_description")}
      <Box sx={{ textAlign: 'center', m: 2 }}>
        <img src={idCopy} alt={t("discord_user_id_and_is_description_image")} />
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Button onClick={() => { setOpen(true); }}>
          <HelpOutlineIcon />{t("click_to_copy_id_is_not_displayed")}
        </Button>
      </Box>

      <Dialog maxWidth="lg" open={open} onClose={() => { setOpen(false); }}>
        <DialogTitle>{t("click_to_copy_id_is_not_displayed_title")}</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {t("click_to_copy_id_is_not_displayed_description")}
          </Typography>

          <Typography>
            {t("click_to_copy_id_is_not_displayed_description_2")}
          </Typography>
          <Box sx={{ textAlign: 'center', m: 2 }}>
            <img src={discordUserSetting} alt="Discordの左下からユーザー設定を開く" />
          </Box>

          <Typography>
            {t("click_to_copy_id_is_not_displayed_description_3")}
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
