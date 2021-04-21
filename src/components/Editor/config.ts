export default {
    height: '500px',
    width: '100%',
    language: 'zh_CN',
    plugins: 'table lists link image preview code',
    toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
    link image | alignleft aligncenter alignright alignjustify  | 
    numlist bullist outdent indent`,
    relative_urls: false,
    file_picker_types: 'image',
    images_upload_url: 'http',
    image_advtab: true,
    image_uploadtab: true,
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
        let formData;
        const file = blobInfo.blob() // 转化为易于理解的file对象
        // eslint-disable-next-line prefer-const
        formData = new FormData()
        formData.append('file', file, file.name)// 此处与源文档不一样
        /* Upload(formData).then((response: any) => {
            const data = response.data.data.url
            success(data)
        }).catch((error: any) => {
            const { data } = error
            failure(data.message)
        }) */
    },
}
