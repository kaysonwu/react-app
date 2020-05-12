import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect, DispatchProp } from 'react-redux';
import { 
  Card, 
  Drawer, 
  Form, 
  Input,
  Select,
  Space, 
  Avatar, 
  Tag, 
  Divider, 
  Switch,
  InputNumber,
  Spin,
} from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { Store } from 'antd/lib/form/interface';
import Page from '@/components/page';
import Table from '@/components/list-table';
import FormItem from '@/components/form-item';
import FormActionBar from '@/components/form-actionbar';

const { Column } = Table;
const { Option } = Select;

interface UserPageProps extends DispatchProp {
  loading?: boolean;
  forming?: boolean;
  submitting?: boolean;
  formVisible?: boolean;
  users?: IUser[];
  user?: IUser;
}

function User({ users, user, dispatch, formVisible, loading, forming, submitting }: UserPageProps) {
  const [form] = Form.useForm();
  const intl = useIntl();

  function onSubmit(e: any) {
    const formVisible = e.key !== undefined;
    form.validateFields().then(payload => {
      if (user) {
        dispatch({ type: 'user/update', formVisible, id: user.id, payload });
      } else {
        dispatch({ type: 'user/create', formVisible, payload });
      }
    });
  }

  function onEdit(e: MouseEvent) {
    const payload = e.currentTarget.getAttribute('data-id');
    dispatch({ type: 'user/show', payload });
  }

  function onDelete(e: MouseEvent) {
    const payload = e.currentTarget.getAttribute('data-id');
    dispatch({ type: 'user/delete', payload });
  }

  function openForm() {
    form.resetFields();
    dispatch({ type: 'user/setFormVisible', visible: true });
  }

  function closeForm() {
    dispatch({ type: 'user/setFormVisible', visible: false });
  }

  useEffect(() => {
    if (user !== undefined) {
      form.setFieldsValue(user);
    }
  }, [user])

  return (
    <Page>
      <Card bordered={false}>
        <Table 
          rowKey="id"
          dataSource={users} 
          loading={loading}
          onCreate={openForm}>
          <Column dataIndex="name" required render={(name, record: any) => {
            const { avatar, sex } = record;
            const man = sex === 1;
            return (
              <Space>
                <Avatar size={24} src={avatar} />
                <span>{name}</span>
                {sex > 0 && (
                  <Tag color={man ? '#1890ff' : '#eb2f96'}>
                    {man ? <ManOutlined /> : <WomanOutlined />}
                  </Tag>
                )}
              </Space>
            );
          }} />
          <Column dataIndex="level.name" defaultSelected render={level => <Tag color="red">{level}</Tag>} />
          <Column dataIndex="phone" defaultSelected />
          <Column dataIndex="balance" defaultSelected />
          <Column dataIndex="points" defaultSelected />
          <Column dataIndex="created_at" align="center" defaultSelected />
          <Column dataIndex="updated_at" align="center" defaultSelected />
          <Column key="action" dataIndex="id" align="center" required render={(id, record) => {
            return (
              <>
                <a key="edit" data-id={id} onClick={onEdit}>
                  {intl.formatMessage({ id: 'Edit' })}
                </a>
                <Divider type="vertical" />
                <a key="delete" data-id={id} onClick={onDelete}>
                  {intl.formatMessage({ id: 'Delete' })}
                </a>
              </>
            );
          }} />
        </Table>
      </Card>
      <Drawer
        width={500}
        closable={false}
        visible={formVisible}
        footer={<FormActionBar loading={submitting} onCancel={closeForm} onSubmit={onSubmit} />}
        style={{ paddingTop: 64 }}
        drawerStyle={{ height: 'calc(100% - 64px)' }}
        onClose={closeForm}
      >
        <Spin
          spinning={forming}
        >
          <Form
            size="large"
            hideRequiredMark
            form={form}
          >
            <FormItem name="name" rules={[{ required: true }]}>
              <Input autoComplete="off" />
            </FormItem>
            <FormItem name="level.name" rules={[{ required: true }]}>
              <Select>
                <Option value="VIP1">VIP1</Option>
                <Option value="VIP2">VIP2</Option>
              </Select>
            </FormItem>
            <FormItem name="phone" rules={[{ required: true, pattern: /^1[3-9]\d{9}$/ }]}>
              <Input autoComplete="off" />
            </FormItem>
            <FormItem
              name="balance"
              style={{ display: 'inline-flex', width: 'calc(50% - 6px)', marginRight: 12 }}
            >
              <InputNumber precision={2} />
            </FormItem>
            <FormItem name="points" style={{ display: 'inline-flex', width: 'calc(50% - 6px)' }}>
              <InputNumber precision={2} />
            </FormItem>
            <FormItem name="state" valuePropName="checked" style={{ textAlign: 'right' }}>
              <Switch style={{ marginRight: 12 }} />
            </FormItem>
          </Form>
        </Spin>
      </Drawer>
    </Page>
  );
}

export default connect(({ global: { loading }, user }: ConnectState) => ({
  loading: Boolean(loading && loading.user),
  submitting: Boolean(loading && loading.userFormSubmitting),
  forming: Boolean(loading && loading.userForming),
  ...user,
}))(User);
