import { Story } from "@storybook/react";
import SelectorToggleButtonGroup, { SelectorToggleButtonGroupProps } from '../SelectorToggleButtonGroup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'component/SelectorToggleButtonGroup',
  component: SelectorToggleButtonGroup,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<SelectorToggleButtonGroupProps> = (args) => <SelectorToggleButtonGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  options: [
    { label: 'label1', value: 'value1' },
    { label: 'label2', value: 'value2' },
    { label: 'label3', value: 'value3' },
    { label: 'label4', value: 'value4' },
    { label: 'label5', value: 'value5' },
  ],
  onChange: () => {},
};