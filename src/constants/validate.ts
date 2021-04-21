import { Rule } from 'antd/lib/form'

const PASSWORDREG = /^[a-zA-Z]\w{5,17}$/
export const CARDREG = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
export const PHONEREG = /^(?:(?:\+|00)86)?1\d{10}$/

/* 邮箱验证 */
export const UserNameRule: Rule[] = [{ required: true, message: '请输入用户名！' }, { type: 'email', message: '请输入正确的邮箱格式！' }]

/* 密码验证 */
export const PassWordRule: Rule[] = [{ required: true, message: '请输入密码！' }, { pattern: PASSWORDREG, message: '输入的密码不合规范！' }]

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
