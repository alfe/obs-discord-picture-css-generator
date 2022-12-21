import { CustomStyle } from "../component/DiscordIconPreview";
import tranceAlfeMouth from '../component/img/trance_alfe_mouth.png';
import { getCssKeyFrames } from "./cssKeyFrames";

const toKebabCase = (string: string) => string
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/[\s_]+/g, '-')
.toLowerCase();

const toImportant = (property: string, className: string): string => {
  switch (true) {
    case className === 'name' && property === 'backgroundColor':
      return ' !important';

    default:
      return '';
  }
}

export const getCssText = ({
  styles, userIdImgUrls, isSolo, speakingStyles, animationColor,
}: {
  styles: CustomStyle;
  userIdImgUrls: string[][];
  isSolo: boolean;
  speakingStyles: string[];
  animationColor: string;
}): string=> {
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
  50%{ content: url("${mouthImgUrl}"); }
  100% {}
}`));

  const imgSoloShowStyle = (!isSolo || (userIdImgUrls || []).length === 0) ? '' : `
img:not([src*="avatars/${userIdImgUrls[0][0]}"]) {
  display: none;
}`;

  return `body, #root {
  overflow: hidden !important;
}
` + 
(Object.keys(styles) as (keyof CustomStyle)[])
.map((className) => (Object.keys(styles[className]).length === 0)
? ''
: `
[class*="Voice_${className}__"] {${Object
.keys(styles[className])
.map(k => `
  ${toKebabCase(k)}: ${styles[className][k]}${toImportant(k, className)};`)
.join(` `)}
}`)
.join(` `).trim()
+ imgSelectors.join('')
+ imgSoloShowStyle
+ getCssKeyFrames(speakingStyles, animationColor)
+ imgAnimations.join('') + `
`;
};
