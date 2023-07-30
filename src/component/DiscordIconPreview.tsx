import React from 'react';
import { useTranslation } from "react-i18next";
// import './animation.css'
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
  user: { [key: string]: string };
  name: { [key: string]: string };
}
export type DiscordIconPreviewProps = {
  styles: CustomStyle,
  isSolo: boolean;
  userIdImgStyles: { [key: string]: {[key: string]: string}};
}

const DiscordIconPreview = ({ styles, isSolo, userIdImgStyles }: DiscordIconPreviewProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "preview" });
  return (
    <div id="app-mount">
      <div style={{
        fontFamily: 'Whitney, sans-serif',
        backgroundColor: 'transparent',
      }} data-reactid=".0">
        <div className="voice-container" style={styles.voiceContainer} data-reactid=".0.0">
          <ul className="voice-states" style={styles.voiceStates} data-reactid=".0.0.0">
            <User
              userId="73000"
              backgroundColor="#5865F2"
              styles={styles}
              img={blueIcon}
              userIdImgStyles={userIdImgStyles?.img0}
              userIdImgSpeakingAnimation={userIdImgStyles?.img0Speaking?.animation}
              userName={t('user_click_to_switch')}
            />
            {!isSolo && (
              <>
                <User userId="73000"
                  backgroundColor="#57F287"
                  styles={styles}
                  img={blueIcon}
                  userIdImgStyles={userIdImgStyles?.img1}
                  userIdImgSpeakingAnimation={userIdImgStyles?.img1Speaking?.animation}
                  userName={t('user_always_talking')} />
                <User userId="73000"
                  backgroundColor="#f7a000"
                  styles={styles}
                  img={greenIcon}
                  userIdImgStyles={userIdImgStyles?.img2}
                  userIdImgSpeakingAnimation={userIdImgStyles?.img2Speaking?.animation}
                  userName={t('user_always_talking')} />
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
  src?: string;
  img?: string;
  styles: CustomStyle;
  userIdImgStyles: { [key: string]: string; };
userIdImgSpeakingAnimation?: string;
}
const User = ({ userId, userName, src, img, styles, userIdImgStyles, userIdImgSpeakingAnimation }: UserProps) => {
  const [speaking, setSpeaking] = React.useState(true);
  return (
    <li className="voice-state" style={styles.voiceState} data-reactid={`.0.0.0.$${userId}/=1$${userId}`} onClick={() => setSpeaking(!speaking)}>
      <img
        className={`avatar ${(speaking) ? 'speaking' : ''}`}
        src={src || DiscordIcon}
        style={{
          content: `url(${img})`,
          ...styles.avatar,
          ...userIdImgStyles,
          ...((speaking) ? {
            ...styles.avatarSpeaking,
            animation: [styles.avatarSpeaking.animation || '', userIdImgSpeakingAnimation || ''].filter(a => !!a).join(', '),
            animationDuration: styles.avatarSpeaking.animationDuration,
          } : {}),
        }}
        data-reactid={`.0.0.0.$${userId}/=1$${userId}.$=10`} />
      <div className="user" style={{ ...styles.user }}>
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
