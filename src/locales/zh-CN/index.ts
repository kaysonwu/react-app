/* eslint-disable no-template-curly-in-string */
import antd from 'antd/lib/locale-provider/zh_CN';
import type { ValidateMessages } from 'rc-field-form/lib/interface';

const zhCN: Locale = {
  antd: {
    ...antd,
    Form: {
      ...antd.Form,
      defaultValidateMessages: {
        ...antd.Form!.defaultValidateMessages,
      } as ValidateMessages,
    },
  },

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
