import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FeedBacky } from '../src';

const meta: Meta = {
  title: 'FeedBack',
  component: FeedBacky,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      fill: {
        control: {
          type: 'text',
        },
      },
      viewBox: {
        control: {
          type: 'text',
        },
      },
      stroke: {
        control: {
          type: 'text',
        },
      },
      strokeWidth: {
        control: {
          type: 'number',
        },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => <FeedBacky {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};


