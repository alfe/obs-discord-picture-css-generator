import { CustomStyle } from "../component/DiscordIconPreview";
import tranceAlfeMouth from '../component/img/trance_alfe_mouth.png';

const toKebabCase = (string: string) => string
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/[\s_]+/g, '-')
.toLowerCase();

const toImportant = (property: string, className: string): string => {
  // console.log(property, className);
  switch (true) {
    case className === 'name' && property === 'backgroundColor':
      return ' !important';

    default:
      return '';
  }
}

export const getCssText = (styles: CustomStyle, userIdImgUrls: string[][], isSolo: boolean): string=> {
  const imgSelectors = userIdImgUrls.filter(([userId, imgUrl]) => !!userId && !!imgUrl).map(([userId, imgUrl, mouthImgUrl]) => (`
img[src*="avatars/${userId}"] {
  content: url(${imgUrl});
  width: auto;
  height: auto;
  max-width: 400px;
  border-radius: 0;
  border: none;
}${(!mouthImgUrl || mouthImgUrl === tranceAlfeMouth) ? '' : `
img[src*="avatars/${userId}"][class*="Voice_avatarSpeaking__"] {
  animation: ${styles.avatarSpeaking.animation}, 750ms infinite alternate ease-in-out mouth-${userId}; 
  animation-duration: ${styles.avatarSpeaking.animationDuration}; 
}`}`));

  const imgAnimations = userIdImgUrls.filter((val) => val.length === 3).map(([userId, imgUrl, mouthImgUrl]) => (`
@keyframes mouth-${userId} {
  0% {}
  50%{
    content: url("${mouthImgUrl}");
  }
  100% {}
}`));

  const imgSoloShowStyle = (!isSolo || (userIdImgUrls || []).length === 0) ? '' : `
img:not([src*="avatars/${userIdImgUrls[0][0]}"]) {
  display: none;
}`;

  return `body, #root, #root * {
  overflow: hidden !important;
}
` + 
(Object.keys(styles) as (keyof CustomStyle)[])
.map((className) => (Object.keys(styles[className]).length === 0)
? ''
: `[class*="Voice_${className}__"] {${Object
.keys(styles[className])
.map(k => `
  ${toKebabCase(k)}: ${styles[className][k]}${toImportant(k, className)};`)
.join(` `)}
}
`)
.join(` `).trim()
+ imgSelectors.join('')
+ imgSoloShowStyle
+ `${!styles.avatarSpeaking?.animation?.includes('speak-light') ? '' : `
@keyframes speak-light {
  0% {
    filter: drop-shadow(0 0 2px #ffffff);
  }
  50% {
    filter: drop-shadow(0 0 8px #ffffff);
  }
  100% {
    filter: drop-shadow(0 0 2px #ffffff);
  }
}`}${!styles.avatarSpeaking?.animation?.includes('speak-jump') ? '' : `
@keyframes speak-jump {
  0% {
    bottom: 0px;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 0px;
  }
}`}` + imgAnimations.join('') + `
`;
};
