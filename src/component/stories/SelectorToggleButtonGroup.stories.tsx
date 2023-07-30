import { Meta, StoryObj } from '@storybook/react'
import SelectorToggleButtonGroup from '../SelectorToggleButtonGroup';

export default { component: SelectorToggleButtonGroup } as Meta;

export const Default: StoryObj = {
  args: {
    title: 'title',
    options: [
      { label: 'label1', value: 'value1' },
      { label: 'label2', value: 'value2' },
      { label: 'label3', value: 'value3' },
      { label: 'label4', value: 'value4' },
      { label: 'label5', value: 'value5' },
    ],
    onChange: () => {},
  },
};