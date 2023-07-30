import { Meta, StoryObj } from '@storybook/react'
import CssString from '../CssString';

export default { component: CssString } as Meta;

export const Default: StoryObj = {
  args: {
    value: `#app-mount .voice-states {
      display: flex;
    } 
    #app-mount .voice-state {
      display: flex; 
      flex-direction: column;
    }   
    #app-mount .name {
      max-width: 64px; 
      box-sizing: border-box; 
      text-overflow: clip; 
      white-space: nowrap; 
      overflow: hidden; 
      display: block; 
      text-align: center;
    }`
  },
};
