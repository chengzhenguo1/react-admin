import React, { memo } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import config from './config'

interface IProps {
    value?: any
    onChange?: (value: string)=>void
}

const MyEditor: React.FC<IProps> = memo(({ value, onChange }) => (
    <Editor
      inline={false}
      apiKey='官网上申请的key值'
      onChange={(value: any) => onChange && onChange(value.level.content)}
      initialValue={value}
      init={{ ...config }} />
))

export default MyEditor
