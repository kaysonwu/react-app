import React, { FC, useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ConfigContext } from 'antd/lib/config-provider';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { ValueType } from './interface';
import { normalizeValue, formatBytes } from './utils';
import './photo.less';

interface PhotoProps extends Omit<UploadProps, 'onChange'> {
  label?: string;
  value?: ValueType;
  size?: number;
  types?: string[];
  onChange?: (value?: unknown) => void;
}

const Photo: FC<PhotoProps> = (
  {
    label,
    name = 'images',
    size = Infinity,
    action = '/v1/uploads',
    types = ['image/png', 'image/jpeg', 'image/gif'],
    value,
    onChange,
    ...props
  },
) => {
  const { formatMessage } = useIntl();
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('upload-photo');

  const [src, setSrc] = useState('');
  const [fileList, setFileList] = useState(() => (value ? [normalizeValue(value)] : undefined));

  function beforeUpload(file: File) {
    if (!types.some(type => type === file.type)) {
      message.error(formatMessage({
        id: 'File type',
        defaultMessage: 'The {label} must be a file of type: {types}.',
      }, { label, types: types.join(',') }));
      return false;
    }

    if (file.size > size) {
      message.error(formatMessage({
        id: 'File size',
        defaultMessage: 'The {label} must be less than {size}.',
      }, { label, size: formatBytes(size) }));
      return false;
    }

    return true;
  }

  function onPreview(file: UploadFile) {
    const { url, response } = file;
    let src = url || response;

    if (src?.url) {
      src = src.url;
    }

    setSrc(src);
  }

  function uploadChange(info: UploadChangeParam) {
    const { file, fileList } = info;
    const { status } = file;

    setFileList(fileList);

    if (onChange && status !== 'error') {
      onChange(status === 'done' ? file.response : undefined);
    }
  }

  return (
    <>
      <Upload
        {...props}
        name={name}
        action={action}
        listType="picture-card"
        withCredentials
        multiple={false}
        fileList={value ? [normalizeValue(value)] : fileList}
        className={prefixCls}
        beforeUpload={beforeUpload}
        onPreview={onPreview}
        onChange={uploadChange}
      >
        {value ? null : (
          <>
            <PlusOutlined />
            <span>{label}</span>
          </>
        )}
      </Upload>
      <Modal
        title={label}
        visible={!!src}
        footer={null}
        onCancel={() => setSrc('')}
      >
        <img src={src} alt={label} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default Photo;
