import React, {
 memo, useState, useCallback, useEffect,
 } from 'react'
import { useAsyncFn, useLocalStorage } from 'react-use'
import store from 'store'
import uploadApi from '@src/api/upload'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload'
  
interface IProps {
  onChange?: (value: any)=> void
  token: string
}

export const UPLOAD_TOKEN = 'admin_upload_token'

const UpLoadPic: React.FC<IProps> = memo(({ token, onChange }) => {
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [uploadKey, setUploadKey] = useState<{token?:string, key?: string}>()
    
    const [, uploadtokenFn] = useAsyncFn(uploadApi.uploadToken)

    useEffect(() => {
        if (!token) { 
          uploadtokenFn('dfawTwXxmuWJywb6LFiAn1a_xU8qz58dl3v7Bp74', 'gynIo9E-zyKeKBrPqeWmmgeA4DQSsl8gpuyYl9dT', 'bigbigtime').then((res) => {
            store.set(UPLOAD_TOKEN, res)
          })
        }
    }, [token])

    const beforeUpload = useCallback((file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      const key = encodeURI(`${file.name}`)
      setUploadKey({ token, key })
      return isJpgOrPng && isLt2M
    }, [])

    const handleChange = useCallback((info) => {
        if (info.file.status === 'uploading') {
          setLoading(true)
          return
        }
        if (info.file.status === 'done') {
          const { key } = info.file.response
          setImgUrl(`http://qkronr45u.hn-bkt.clouddn.com/${key}`)
          setLoading(false)
        }
        if (onChange) { onChange(info) }
      }, [])

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <Upload
          name='avatar'
          listType='picture-card'
          showUploadList={false}
          data={uploadKey}
          action='https://up-z2.qiniup.com'
          beforeUpload={beforeUpload}
          onChange={handleChange}>
            {imgUrl ? <img src={imgUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )
 })

export default UpLoadPic
