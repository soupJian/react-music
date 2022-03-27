import React from 'react';
import { Modal } from 'antd';
interface props {
  text: string;
  showConfirm: boolean;
  onCloseConfirm: Function;
  onClear: Function;
  cancelText: string;
  okText: string;
}
const index = (props: props) => {
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
