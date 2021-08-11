/* eslint-disable no-template-curly-in-string */
import antd from 'antd/lib/locale-provider/zh_CN';

const typeTemplate = '${label} 必须是 ${type} 类型';
const validateMessages = {
  default: '${label} 不符合规则',
  required: '${label} 不能为空',
  enum: '${label} 没有在 [${enum}] 中',
  whitespace: '${label} 不能包含空格',
  date: {
    format: '${label} 不是一个有效的日期',
    parse: '${label} 不是一个有效的日期',
    invalid: '${label} 不是一个有效的日期',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: '${label} 必须是 ${len} 个字符',
    min: '${label} 至少为 ${min} 个字符',
    max: '${label} 不能大于 ${max} 个字符',
    range: '${label} 必须介于 ${min} - ${max} 个字符之间',
  },
  number: {
    len: '${label} 大小必须为 ${len}',
    min: '${label} 必须大于等于 ${min}',
    max: '${label} 不能大于 ${max}',
    range: '${label} 必须介于 ${min} - ${max} 之间',
  },
  array: {
    len: '${label} 必须为 ${len} 个单元',
    min: '${label} 至少有 ${min} 个单元',
    max: '${label} 最多只有 ${max} 个单元',
    range: '${label} 须只有 ${min} - ${max} 个单元',
  },
  pattern: {
    mismatch: '${label} 的格式错误',
  },
};

const zhCN: Locale = {
  antd,
  validateMessages,

  'App Name': 'React 脚手架',

  // Exception
  'Back Home': '返回首页',
  'Go Back': '回到之前',
  'Try Again': '重新尝试',
  Forbidden: '访问受限',
  "Sorry, you don't have access to this page.": '抱歉！你没有该页面的访问权限！',
  'Not Found': '页面不存在',
  'Sorry, the page you visited does not exist.': '抱歉！你访问的页面不存在！',
  'Internal Server Error': '服务器错误',
  'Sorry, the server is reporting an error.': '抱歉！服务器发生错误，请重新尝试！',
  'Successful operation': '操作成功',
};

export default zhCN;
