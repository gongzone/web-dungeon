import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Buttons'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const FirstStory = Template.bind({})

FirstStory.args = {}
