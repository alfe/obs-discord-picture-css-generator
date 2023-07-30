import { Meta, StoryObj } from '@storybook/react'
import SliderListItem, { SliderListItemProps } from '../SliderListItem';

export default { component: SliderListItem } as Meta;

export const Default: StoryObj = {
  args: {
    title: 'title',
    onChange: () => {},
  },
};

export const Disabled: StoryObj = {
  args: {
    title: 'title',
    onChange: () => {},
  },
};

export const withMax: StoryObj = {
  args: {
    title: 'title',
    max: 5,
    onChange: () => {},
  },
};

export const withMin: StoryObj = {
  args: {
    title: 'title',
    min: 5,
    onChange: () => {},
  },
};
