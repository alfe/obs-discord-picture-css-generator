import { StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import InputUserIdImgUrlForm from '../InputUserIdImgUrlForm';

export default { component: InputUserIdImgUrlForm };

export const Default: StoryObj = {
  args: {
    name: 'name',
    hasHelp: true,
    onChange: action('onChange'),
  },
};
