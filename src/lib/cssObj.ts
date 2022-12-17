import { CustomStyle } from "../component/DiscordIconPreview";

type StringValArg = {
  val: string;
  styles: CustomStyle;
  setStyles: React.Dispatch<React.SetStateAction<CustomStyle>>;
};

// アイコンの並び
export const imgAvatarStyle = ({ imgIndex, val, styles, setStyles }: {
  imgIndex: string;
  val: string[];
  styles: any;
  setStyles: React.Dispatch<React.SetStateAction<any>>;
}) => {
  // const imgSelector = `img[src*="avatars/${val[0]}"]`;
  setStyles({
    ...styles,
    [imgIndex]: {
      content: `url(${val[1]})`,
      height: 'auto',
      width: 'auto',
      maxWidth: '400px',
      maxheight: '400px',
      borderRadius: '0',
      border: 'none',
    }
  });
};

// アイコンの間隔（上下）
const iconRowGap = ({ val, styles, setStyles }: StringValArg) => {
  const { rowGap, ...voiceStates } = styles.voiceStates;
  switch (val) {
    case '0':
      setStyles({
        ...styles,
        voiceStates: {
          ...voiceStates,
        },
      });
      break;
    default:
      setStyles({
        ...styles,
        voiceStates: {
          ...voiceStates,
          rowGap: `${val}px`,
        },
      });
      break;
  }
};

// アイコンの間隔（左右）
const iconColumnGap = ({ val, styles, setStyles }: StringValArg) => {
  const { columnGap, ...voiceStates } = styles.voiceStates;
  switch (val) {
    case '0':
      setStyles({
        ...styles,
        voiceStates: {
          ...voiceStates,
        },
      });
      break;
    default:
      setStyles({
        ...styles,
        voiceStates: {
          ...voiceStates,
          columnGap: `${val}px`,
        },
      });
      break;
  }
};

// アイコンの形
const iconShape = ({ val, styles, setStyles }: StringValArg) => {
  const { borderRadius, ...avatar } = styles.avatar;
  setStyles({
    ...styles,
    avatar: {
      ...avatar,
      ...((val === 'circle') ? {} : {
        borderRadius: (val === 'rect-r') ? '8px' : '0px',
      })
    }
  })
};

// 話すときの動き
const iconSpeaking = ({ val, styles, setStyles }: StringValArg) => {
  const { filter: _, ...avatar } = styles.avatar;
  const { position, animation, animationDuration, filter, borderColor, ...avatarSpeaking } = styles.avatarSpeaking;
  switch (val) {
    case 'light':
      setStyles({
        ...styles,
        avatar: {
          ...avatar,
          filter: 'brightness(70%)',
        },
        avatarSpeaking: {
          ...avatarSpeaking,
          position: 'relative',
          animation: '300ms infinite alternate ease-in-out speak-light',
          filter: 'brightness(100%)',
          borderColor: 'rgba(255,255,255,.75)', // !important
        }
      });
      break;
    case 'jump':
      setStyles({
        ...styles,
        avatar: {
          ...avatar,
          filter: 'brightness(70%)',
        },
        avatarSpeaking: {
          ...avatarSpeaking,
          position: 'relative',
          animation: '300ms infinite alternate ease-in-out speak-jump',
          filter: 'brightness(100%)',
          borderColor: 'transparent', // !important
        }
      });
      break;
    default:
      setStyles({
        ...styles,
        avatar: {
          ...avatar,
          filter: 'brightness(70%)',
        },
        avatarSpeaking: {
          ...avatarSpeaking,
          position: 'relative',
          filter: 'brightness(100%) drop-shadow(2px 2px 0px #43b581) drop-shadow(-2px -2px 0px #43b581) drop-shadow(-2px 2px 0px #43b581) drop-shadow(2px -2px 0px #43b581)',
          borderColor: 'transparent', // !important
        }
      });
      break;
  }
}

// 動きの速さ
const iconSpeakingDuration = ({ val, styles, setStyles }: StringValArg) => {
  const { animationDuration, ...avatarSpeaking } = styles.avatarSpeaking;
  switch (val) {
    case '0':
      setStyles({
        ...styles,
        avatarSpeaking: {
          ...avatarSpeaking,
          animationDuration: `750ms`,
        },
      });
      break;
    default:
      setStyles({
        ...styles,
        avatarSpeaking: {
          ...avatarSpeaking,
          animationDuration: `${751 - Number(val) * 5}ms`,
        },
      });
      break;
  }
};

export default {
  iconRowGap,
  iconColumnGap,
  iconShape,
  iconSpeaking,
  iconSpeakingDuration,
};
