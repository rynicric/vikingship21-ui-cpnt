import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, { AutoCompleteProps } from './autocomplete'
import { DataSourceProps } from './autocomplete'

export default {
  title: 'Example/AutoComplete',
  component: AutoComplete,
} as Meta

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

interface LakerPlayerProps {
  value: string;
  number: number;
}

const LakersWithNumber = [
  { value: 'bradley', number: 11 },
  { value: 'pope', number: 1 },
  { value: 'caruso', number: 4 },
  { value: 'cook', number: 2 },
  { value: 'cousins', number: 15 },
  { value: 'james', number: 23 },
  { value: 'AD', number: 3 },
  { value: 'green', number: 14 },
  { value: 'howard', number: 39 },
  { value: 'kuzma', number: 0 },
]

const Template: Story<AutoCompleteProps> = (args) => (
  <AutoComplete onSelect={action('selected')} {...args} />
)

export const Local = Template.bind({});
Local.args = {
  fetchSugg: (query) => (
    LakersWithNumber.filter(itm => itm.value.includes(query))
  ),
  renderSugg: (item) => {
    const itm = item as LakerPlayerProps
    return <span><b>{itm.value}</b> ({itm.number})</span>
  },
}

export const Promise = Template.bind({})
Promise.args = {
  fetchSugg: (query) => (
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(rst => rst.json())
      .then(({ items }) => (
        items.slice(0, 10).map((itm: any) => ({ value: itm.login, ...itm }))
      ))
  ),
  renderSugg: (item) => {
    const itm = item as DataSourceProps<GithubUserProps>
    return <span><b>{itm.value}</b> ({itm.url})</span>
  }
}
