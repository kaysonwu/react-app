import React, { CSSProperties, FC, useContext, useEffect, MouseEvent } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { DispatchProp } from 'react-redux';
import { Drawer, Spin, Form, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { ConfigContext } from 'antd/lib/config-provider';
import { DrawerProps } from 'antd/lib/drawer';
import { FormProps } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import { ClickParam } from 'antd/lib/menu';
import './index.less';

interface DrawerFormProps extends
DispatchProp,
DrawerProps,
Omit<FormProps, 'title' | 'initialValues' | 'onFinish' | 'onFinishFailed' | 'onFieldsChange' | 'onValuesChange'> {
  id: string;
  record?: Store;
  formStyle?: CSSProperties;
  loading?: boolean;
  submitting?: boolean;
}

const DrawerForm: FC<DrawerFormProps> = (
  {
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
    footer,
    loading,
    submitting,
    id,
    dispatch,
    className: customizeClassName,
    ...resetProps
  },
) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer-form');
  const className = classNames(prefixCls, customizeClassName);

  const [form] = Form.useForm(formInstance);
  const intl = useIntl();

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  function onSubmit(e: ClickParam | MouseEvent) {
    const closeForm = (e as ClickParam).key === undefined;

    form.validateFields().then(payload => {
      if (record) {
        dispatch({ type: `${id}/update`, id: record.id, payload, closeForm });
      } else {
        dispatch({ type: `${id}/create`, payload, closeForm });
      }
    });
  }

  function onClose() {
    form.resetFields();
    dispatch({ type: `${id}/setFormVisible`, visible: false });
  }

  const footerDom = (
    <>
      {footer}
      <Button size={size} onClick={onClose}>
        {intl.formatMessage({ id: 'Cancel' })}
      </Button>
      <Dropdown.Button
        type="primary"
        trigger={['click']}
        size={size}
        icon={<DownOutlined />}
        overlay={(
          <Menu onClick={onSubmit}>
            <Menu.Item key="submit">
              {intl.formatMessage({ id: 'Submit And Continue' })}
            </Menu.Item>
          </Menu>
        )}
        onClick={onSubmit}
      >
        {submitting && <LoadingOutlined />}
        {intl.formatMessage({ id: 'Submit' })}
      </Dropdown.Button>
    </>
  );

  return (
    <Drawer
      maskStyle={{ opacity: 0, animation: 'none' }}
      {...resetProps}
      closable={false}
      footer={footerDom}
      className={className}
      onClose={onClose}
    >
      <Spin spinning={!!loading}>
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
