import { Rule } from 'antd/lib/form'

export const EMAILREG = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const PASSWORDREG = /^[a-zA-Z]\w{5,17}$/

/* 邮箱验证 */
export const UserNameRule: Rule[] = [{ required: true, message: '请输入用户名！' }, { type: 'email', message: '请输入正确的邮箱格式！' }]

/* 密码验证 */
export const PassWordRule: Rule[] = [{ required: true, message: '请输入密码！' }, () => ({
    validator(_, value) {
      if (!value || PASSWORDREG.exec(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('请输入正确的密码格式!'))
    },
  }),
]

/* 确认密码 */
export const ConfirmRule: Rule[] = [{ required: true, message: '请重复输入密码！' }, ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('您输入的两个密码不匹配!'))
  },
}),
]

/* 验证码 */
export const CaptchaRule : Rule[] = [{ required: true, message: '请输入验证码！' }, { len: 6, message: '请检查验证码长度！' }]