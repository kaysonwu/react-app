import React, { FC, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import { connect, DispatchProp } from 'react-redux';
import { Button, Divider, Row, Col, Space, InputNumber, Input, Switch, Select, Avatar, Card, Tag } from 'antd';
import { PlusOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form';
import { UserState } from '@/models/user';
import { Content as Page } from '@/components/layout';
import { AnimateTable, Table } from '@/components/list';
import Toolbar from '@/components/toolbar';
import ColumnSelect from '@/components/column-picker';
import { Photo } from '@/components/upload';
import DrawerForm, { SubmitEventHandler } from '@/components/drawer-form';
import FormItem from '@/components/form-item';

const { Column } = Table;
const { Option } = Select;

interface UserPageProps extends UserState, LoadingState, DispatchProp {
  onCreate: () => void;
  onEdit: (e: SyntheticEvent) => void;
  onDelete: (e: SyntheticEvent) => void;
  onCloseForm: () => void;
  onSubmit: SubmitEventHandler;
}

const User: FC<UserPageProps> = (
  {
    data,
    loading,
    record,
    formVisible,
    submitting,
    onCloseForm,
    onSubmit,
    onCreate,
    onEdit,
    onDelete,
  },
) => {
  const { formatMessage } = useIntl();

  const renderUser = (name: string, record: IUser) => {
    const { avatar, sex } = record;
    const man = sex === 1;

    return (
      <Space>
        <Avatar size={24} src={avatar} />
        <span>{name}</span>
        {sex! > 0 && (
          <Tag color={man ? '#1890ff' : '#eb2f96'}>
            {man ? <ManOutlined /> : <WomanOutlined />}
          </Tag>
        )}
      </Space>
    );
  };

  const renderTag = (name: string) => <Tag color="red">{name}</Tag>;

  const renderAction = (id: number) => (
    <>
      <Button type="link" data-id={id} onClick={onEdit}>
        {formatMessage({ id: 'Edit' })}
      </Button>
      <Divider type="vertical" />
      <Button type="link" data-id={id} onClick={onDelete}>
        {formatMessage({ id: 'Delete' })}
      </Button>
    </>
  );

  return (
    <Page>
      <Card
        bordered={false}
      >
        <AnimateTable
          rowKey="id"
          pagination={false}
          dataSource={data}
          loading={loading}
          isPageTween={loading}
          toolbar={(
            <Toolbar>
              {onCreate && (
                <Toolbar.ItemGroup key="left">
                  <Toolbar.Item
                    key="new"
                    component={(
                      <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
                        {formatMessage({ id: 'New' })}
                      </Button>
                    )}
                  />
                </Toolbar.ItemGroup>
              )}
              <Toolbar.ItemGroup key="right" align="right">
                <Toolbar.Item key="column-select" component={ColumnSelect} />
              </Toolbar.ItemGroup>
            </Toolbar>
          )}
        >
          <Column dataIndex="name" required render={renderUser} />
          <Column dataIndex="level.name" defaultVisible render={renderTag} />
          <Column dataIndex="phone" defaultVisible />
          <Column dataIndex="balance" defaultVisible />
          <Column dataIndex="points" defaultVisible />
          <Column dataIndex="created_at" align="center" defaultVisible />
          <Column dataIndex="updated_at" align="center" defaultVisible />
          <Column key="action" dataIndex="id" align="center" required render={renderAction} />
        </AnimateTable>
      </Card>
      <DrawerForm
        size="large"
        width={500}
        hideRequiredMark
        record={record}
        visible={formVisible}
        submitting={submitting}
        onClose={onCloseForm}
        onSubmit={onSubmit}
      >
        <Row>
          <Col span={18} style={{ paddingRight: 16 }}>
            <FormItem name="name" rules={[{ required: true }]}>
              <Input autoComplete="off" />
            </FormItem>
            <FormItem name="level.name" rules={[{ required: true }]}>
              <Select>
                <Option value="VIP1">VIP1</Option>
                <Option value="VIP2">VIP2</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="avatar" noStyle>
              <Photo label={formatMessage({ id: 'Avatar' })} />
            </FormItem>
          </Col>
        </Row>
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
          <Switch />
        </FormItem>
      </DrawerForm>
    </Page>
  );
};

export default connect(({ global: { loading }, user }: ConnectState) => ({
  ...loading?.user,
  ...user,
}), dispatch => ({
  onCreate: () => dispatch({ type: 'user/openForm' }),
  onEdit: (e: SyntheticEvent) => dispatch({ type: 'user/show', id: e.currentTarget.getAttribute('data-id') }),
  onDelete: (e: SyntheticEvent) => dispatch({ type: 'user/delete', id: e.currentTarget.getAttribute('data-id') }),
  onSubmit: (record: Store | undefined, data: Store, form: FormInstance, formVisible: boolean) => dispatch({ type: `user/${record ? 'update' : 'create'}`, id: record?.id, data, form, formVisible }),
  onCloseForm: () => dispatch({ type: 'user/closeForm' }),
}))(User);
