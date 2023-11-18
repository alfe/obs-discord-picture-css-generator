import { CustomStyle } from "../component/DiscordIconPreview";

type StringValArg = {
  val: string;
  styles: CustomStyle;
  setStyles: React.Dispatch<React.SetStateAction<CustomStyle>>;
};
type StyleInsetType = {
  styles: CustomStyle;
  setStyles: React.Dispatch<React.SetStateAction<CustomStyle>>;
}

// アバターの表示
export const imgAvatarStyle = ({ imgIndex, userId = '000000000000000000', isHasMaxWidth, val, styles, setStyles }: {
  imgIndex: string;
  userId: string;
  isHasMaxWidth: boolean;
  val: string[];
  styles: any;
  setStyles: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [_userId, imgUrl, mouthImgUrl, memo] = val;
  setStyles({
    ...styles,
    [imgIndex]: {
      content: `url(${imgUrl})`, // preview用
      height: 'auto',
      width: 'auto',
      ...(isHasMaxWidth ? {
        maxWidth: '400px',
        maxheight: '400px',
      }: {}),
      borderRadius: '0',
      border: 'none',
    },
    [`${imgIndex}Speaking`]: {
      animation: `750ms infinite alternate ease-in-out mouth-${userId}`,
    },
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
export const setIconSpeakingStyle = ({ val, styles, setStyles }: StyleInsetType & { val: string[] }) => {
  const { filter: _, ...avatar } = styles.avatar;
  const { position, animation, animationDuration, filter, borderColor, ...avatarSpeaking } = styles.avatarSpeaking;

  const newAnimation = val.map((animationType: string) => {
    switch (animationType) {
      case 'border':
        return `750ms infinite alternate ease-in-out speak-border`;
      case 'light':
        return `750ms infinite alternate ease-in-out speak-light`;
      case 'jump':
        return `750ms infinite alternate ease-in-out speak-jump`;
      default: return '';
    }
  })
  console.log(newAnimation)

  setStyles({
    ...styles,
    avatar: {
      ...avatar,
      filter: 'brightness(70%)',
    },
    avatarSpeaking: {
      ...avatarSpeaking,
      position: 'relative',
      filter: 'brightness(100%)',
      ...(newAnimation.length === 0 ? '' : { animation: newAnimation.join(',')}),
      animationDuration,
    }
  });
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

export const setUsernameHidden = ({ val, styles, setStyles }: {
  val: boolean;
  styles: CustomStyle;
  setStyles: React.Dispatch<React.SetStateAction<CustomStyle>>;
}) => {
  if (val) {
    setStyles({
      ...styles,
      user: {},
      name: { display: 'none' },
    })
  } else {
    setStyles({
      ...styles,
      user: {
        textAlign: 'center',
      },
      name: {
        position: 'relative',
        top: '0px',
        left: '0px',
      },
    })
  }
}
export const setUsernameHorizontal = ({ val, styles, setStyles }: StringValArg) => {
  setStyles({
    ...styles,
    name: {
      ...styles.name,
      top: `${val}px`,
    },
  })
}
export const setUsernameVertical = ({ val, styles, setStyles }: StringValArg) => {
  setStyles({
    ...styles,
    name: {
      ...styles.name,
      left: `${val}px`,
    },
  })
}

export default {
  iconRowGap,
  iconColumnGap,
  iconShape,
  iconSpeakingDuration,
};
