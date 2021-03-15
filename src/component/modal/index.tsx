import React from 'react';
import { Modal } from 'antd';

const index = (props: {
  text: string;
  showConfirm: boolean;
  onCloseConfirm: any;
  onClear: any;
  cancelText: string;
  okText: string;
}) => {
  const text = props.text;
  const handleOk = () => {
    props.onClear();
  };
  const handleCancel = () => {
    props.onCloseConfirm();
  };
  return (
    <div>
      <Modal
        visible={props.showConfirm}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={props.cancelText}
        okText={props.okText}
      >
        <p>{text}</p>
      </Modal>
    </div>
  );
};

export default index;
