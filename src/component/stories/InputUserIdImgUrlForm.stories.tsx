import { StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'
import InputUserIdImgUrlForm from '../InputUserIdImgUrlForm';

export default { component: InputUserIdImgUrlForm };

export const Default: StoryObj = {
  args: {
    name: 'name',
    hasHelp: true,
    onChange: action('onChange'),
  },
};
