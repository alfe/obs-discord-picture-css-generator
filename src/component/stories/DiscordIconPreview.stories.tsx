import { Meta, StoryObj } from '@storybook/react-vite'
import DiscordIconPreview from '../DiscordIconPreview';

export default { component: DiscordIconPreview } as Meta

export const Default: StoryObj = {
  args: {
    styles: {
      voiceContainer: {},
      voiceStates: {},
      voiceState: {},
      avatar: {},
      avatarSpeaking: {},
      user: {},
      name: {},
    },
  },
};