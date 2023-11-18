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
  styles, userIdImgUrls, isSolo, speakingStyles, animationColor, isHasMaxWidth,isNotSetShow,
}: {
  styles: CustomStyle;
  userIdImgUrls: string[][];
  isSolo: boolean;
  speakingStyles: string[];
  animationColor: string;
  isHasMaxWidth: boolean;
  isNotSetShow: boolean;
}): string=> {
  const urlVariants: string[] = [];
  const imgSelectors = userIdImgUrls
    .filter(([userId, imgUrl]) => !!userId && !!imgUrl && userId !== '000000000000000000')
    .map(([userId, imgUrl, mouthImgUrl, memo]) => {
    urlVariants.push(`
  /* ${userId} ${memo} */
  --img-stand-url-${userId}: url("${imgUrl}");
  --img-mouth-url-${userId}: url("${mouthImgUrl}");
`);
    return (`
${(isNotSetShow) ? '' : `
img {
  display: none;
}
`}
img[src*="avatars/${userId}"] {
  content: var(--img-stand-url-${userId});
  display: block;
  width: auto;
  height: auto;${!isHasMaxWidth ? '' : `
  max-width: 400px;`}
  border-radius: 0;
  border: none;
}${(!mouthImgUrl || mouthImgUrl === tranceAlfeMouth) ? '' : `
img[src*="avatars/${userId}"][class*="Voice_avatarSpeaking__"] {
  animation: ${styles.avatarSpeaking.animation}, ${styles.avatarSpeaking.animationDuration || '750ms'} infinite alternate ease-in-out mouth-${userId};
}`}`);
  }
).join('');


  const imgAnimations = userIdImgUrls
    .filter(([userId, imgUrl, mouthImgUrl]) => !!userId && !!mouthImgUrl && userId !== '000000000000000000')
    .map(([userId, imgUrl, mouthImgUrl]) => (`
@keyframes mouth-${userId} {
  0% {}
  50%{ content: var(--img-mouth-url-${userId}); }
  100% {}
}`));

  const imgSoloShowStyle = (!isSolo || (userIdImgUrls || []).length === 0) ? '' : `
img:not([src*="avatars/${userIdImgUrls[0][0]}"]), img:not([src*="avatars/${userIdImgUrls[0][0]}"]) + [class*="Voice_user__"] {
  display: none;
}`;

  return `:root {${urlVariants.join('')}}
body, #root {
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
+ imgSelectors
+ imgSoloShowStyle
+ getCssKeyFrames(speakingStyles, animationColor)
+ imgAnimations.join('') + `
`;
};
