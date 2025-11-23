import { Meta, StoryObj } from '@storybook/react-vite'
import ClipboardButton from '../ClipboardButton';

export default { component: ClipboardButton } as Meta;

export const Default: StoryObj = {
  args: {
    value: `copied text`
  },
};
