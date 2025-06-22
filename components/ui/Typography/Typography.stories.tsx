import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

// Headings
export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

export const H6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

// Paragraph
export const Paragraph: Story = {
  args: {
    children:
      'This is a paragraph with some long text. Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.',
  },
};

// Blockquote
export const Blockquote: Story = {
  args: {
    variant: 'blockquote',
    children: 'Design is not just what it looks like and feels like. Design is how it works.',
  },
};

// List
export const List: Story = {
  args: {
    variant: 'list',
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
  },
};

// Inline Code
export const InlineCode: Story = {
  args: {
    variant: 'inlineCode',
    children: 'npm install @package/name',
  },
};

// Lead Text
export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'A more prominent paragraph, usually used for introductions or important text.',
  },
};

// Large Text
export const Large: Story = {
  args: {
    variant: 'large',
    children: 'This is larger than normal text',
  },
};

// Small Text
export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is smaller text',
  },
};

// Muted Text
export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text, less prominent than normal text',
  },
};

// Font Weights
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="thin">Thin weight text</Typography>
      <Typography weight="extralight">Extra light weight text</Typography>
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
      <Typography weight="extrabold">Extra bold weight text</Typography>
    </div>
  ),
};

// Custom Element
export const CustomElement: Story = {
  args: {
    as: 'span',
    children: 'This typography uses a span element',
  },
};

// Combined Features
export const CombinedFeatures: Story = {
  args: {
    variant: 'h2',
    weight: 'bold',
    className: 'text-primary',
    children: 'Custom Styled Heading',
  },
};
