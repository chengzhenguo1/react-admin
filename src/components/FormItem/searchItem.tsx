import React, { memo } from 'react'
import { StatusText } from '@src/assets/data'
import { ItemConfig, ItemProps, OptionItemType } from './type'
import FormInput from '../FromInput/input'

interface SearchItemType {
    SearchName: React.FC<ItemProps>,
    SearchStatus: React.FC<ItemProps>,
}

export interface SearchParam {
    name?: string
    status?: boolean | undefined
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
        optionItem: StatusText,
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
