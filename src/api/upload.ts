import axios from '@src/utils/request'

const uploadToken = async (ak: string, sk: string, buckety: string) => {
    const res = await <any>axios({
        url: '/uploadIToken/',
        method: 'POST',
        data: {
            ak,
            sk,
            buckety,
        },
    })

    return res.data.token
}

export default {
    uploadToken,
}
