import React, { CSSProperties, FC, useContext, useEffect, MouseEvent, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Button, Dropdown, Menu, Form, Drawer, Spin } from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { ConfigContext } from 'antd/lib/config-provider';
import { DrawerProps } from 'antd/lib/drawer';
import { FormProps, FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import { SpinProps } from 'antd/lib/spin';
import './index.less';

export type SubmitEventHandler = (
  record: Store | undefined,
  value: Store,
  form: FormInstance,
  formVisible: boolean,
) => void;

interface DrawerFormProps
  extends DrawerProps,
    Omit<
      FormProps,
      | 'title'
      | 'initialValues'
      | 'onFinish'
      | 'onFinishFailed'
      | 'onFieldsChange'
      | 'onValuesChange'
    > {
  record?: Store;
  formStyle?: CSSProperties;
  loading?: boolean | SpinProps;
  submitting?: boolean;
  onSubmit?: SubmitEventHandler;
}

const DrawerForm: FC<DrawerFormProps> = ({
  form: formInstance,
  component,
  colon,
  fields,
  hideRequiredMark,
  record,
  labelAlign,
  labelCol,
  layout,
  name,
  scrollToFirstError,
  size,
  validateMessages,
  wrapperCol,
  formStyle,
  children,
  footer: customizeFooter,
  loading = false,
  submitting,
  visible,
  className: customizeClassName,
  onClose,
  onSubmit,
  ...resetProps
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer-form');
  const className = classNames(prefixCls, customizeClassName);

  const spinProps = typeof loading === 'boolean' ? { spinning: loading } : loading;
  const [form] = Form.useForm(formInstance);
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (record) {
      if (visible) {
        form.setFieldsValue(record);
      } else {
        form.resetFields();
      }
    }
  }, [visible, record, form]);

  function handleSubmit(e: { key: React.Key } | MouseEvent) {
    const continued = (e as { key: React.Key }).key === 'submit';
    form.validateFields().then(value => {
      onSubmit?.(record, value, form, continued);
    });
  }

  let footer = customizeFooter;
  if (footer === undefined) {
    footer = (
      <>
        <Button size={size} onClick={onClose as MouseEventHandler}>
          {formatMessage({ id: 'Cancel' })}
        </Button>
        <Dropdown.Button
          type="primary"
          trigger={['click']}
          size={size}
          icon={<DownOutlined />}
          overlay={(
            <Menu onClick={handleSubmit}>
              <Menu.Item key="submit">
                {formatMessage({ id: 'Submit And Continue' })}
              </Menu.Item>
            </Menu>
          )}
          onClick={handleSubmit}
        >
          {submitting && <LoadingOutlined />}
          {formatMessage({ id: 'Submit' })}
        </Dropdown.Button>
      </>
    );
  }

  return (
    <Drawer
      maskStyle={{ opacity: 0, animation: 'none' }}
      {...resetProps}
      closable={false}
      visible={visible}
      footer={footer}
      className={className}
      onClose={onClose}
    >
      <Spin {...spinProps}>
        <Form
          component={component}
          colon={colon}
          fields={fields}
          form={form}
          hideRequiredMark={hideRequiredMark}
          labelAlign={labelAlign}
          labelCol={labelCol}
          layout={layout}
          name={name}
          scrollToFirstError={scrollToFirstError}
          size={size}
          validateMessages={validateMessages}
          wrapperCol={wrapperCol}
          style={formStyle}
        >
          {children}
        </Form>
      </Spin>
    </Drawer>
  );
};

export default DrawerForm;
