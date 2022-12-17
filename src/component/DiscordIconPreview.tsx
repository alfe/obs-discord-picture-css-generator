import React from 'react';
import { useTranslation } from "react-i18next";
import './animation.css'
import './Discord.css'
// https://discord.com/branding
import DiscordIcon from './Discord-icon.svg'
import greenIcon from './img/green-icon.png';
import blueIcon from './img/blue-icon.png';

export type CustomStyle = {
  voiceContainer: { [key: string]: string },
  voiceStates: { [key: string]: string };
  voiceState: { [key: string]: string };
  avatar: { [key: string]: string };
  avatarSpeaking: { [key: string]: string };
  name: { [key: string]: string };
}
export type DiscordIconPreviewProps = {
  styles: CustomStyle,
  isSolo: boolean;
  userIdImgStyles: { [key: string]: {[key: string]: string} };
}

const DiscordIconPreview = ({ styles, isSolo, userIdImgStyles }: DiscordIconPreviewProps) => {
  const [speaking, setSpeaking] = React.useState(true);
  const { t } = useTranslation("translation", { keyPrefix: "preview" });
  return (
    <div id="app-mount">
      <div style={{
        fontFamily: 'Whitney, sans-serif',
        backgroundColor: 'transparent',
      }} data-reactid=".0">
        <div className="voice-container" style={styles.voiceContainer} data-reactid=".0.0">
          <ul className="voice-states" style={styles.voiceStates} data-reactid=".0.0.0">
            <User userId="739080466790875187" backgroundColor="#5865F2" styles={styles} img={blueIcon} userIdImgStyles={userIdImgStyles.img0} userName={t('user_click_to_switch')} speaking={speaking} onClick={() => setSpeaking(!speaking)} />
            {!isSolo && (
              <>
                <User userId="739080466790875187" backgroundColor="#f7a000" styles={styles} img={greenIcon} userIdImgStyles={userIdImgStyles.img2} userName={t('user_always_talking')} speaking />
                <User userId="739080466790875187" backgroundColor="#57F287" styles={styles} img={blueIcon} userIdImgStyles={userIdImgStyles.img1} userName={t('user_always_talking')} speaking />
              </>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DiscordIconPreview;

type UserProps = {
  userId: string;
  userName: string;
  backgroundColor: string;
  speaking?: boolean;
  src?: string;
  img?: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  styles: CustomStyle;
  userIdImgStyles: { [key: string]: string; };
}
const User = ({ userId, userName, speaking, src, img, onClick, styles, userIdImgStyles }: UserProps) => {
  return (
    <li className="voice-state" style={styles.voiceState} data-reactid={`.0.0.0.$${userId}/=1$${userId}`} onClick={onClick}>
      <img
        className={`avatar ${speaking ? 'speaking' : ''}`}
        src={src || DiscordIcon}
        style={{
          content: `url(${img})`,
          ...styles.avatar,
          ...(speaking ? styles.avatarSpeaking : {}),
          ...userIdImgStyles,
        }}
        data-reactid={`.0.0.0.$${userId}/=1$${userId}.$=10`} />
      <div className="user" data-reactid={`.0.0.0.$${userId}/=1$${userId}.$/=11`}>
        <span
          className="name"
          style={{
            color: '#ffffff',
            fontSize: 14,
            backgroundColor: 'rgba(30, 33, 36, 0.95)',
            ...styles.name,
          }}
          data-reactid={`.0.0.0.$${userId}/=1$${userId}.$/=11.0`}>
          {userName}
        </span>
      </div>
    </li>
  );
};
