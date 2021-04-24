import React, { memo } from 'react'
import { UserStatus } from '@src/assets/data'
import { ItemConfig, ItemProps } from './type'
import FormInput from '../FromInput/input'

interface SearchItemType {
    SearchName: React.FC<ItemProps>,
    SearchStatus: React.FC<ItemProps>,
}

const config: {[key in keyof SearchItemType]: ItemConfig} = {
    SearchName: {
        name: 'name',
        label: '名称',
        inputProps: {
            placeholder: '名称',
            type: 'text',
        },
    }, 
    SearchStatus: {
        name: 'status',
        label: '禁启用',
        inputProps: {
            type: 'select',
        },
        width: 100,
        optionItem: UserStatus,
    },
}

function SearchName(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.SearchName}
          {...props} />
)
}

function SearchStatus(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.SearchStatus}
          {...props} />
)
}

const SearchItem: SearchItemType = {
    SearchName: memo(SearchName),
    SearchStatus: memo(SearchStatus),
}

export default SearchItem
