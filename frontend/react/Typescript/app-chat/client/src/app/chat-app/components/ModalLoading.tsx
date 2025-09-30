import * as React from 'react';
import Modal from '../../../common/components/Modal';

interface Props {
  message?: any[];
}

const ModalLoading = ({ message }: Props) => {
  if (message) {
    message = message.map((content: any) => content.split('_').join(' '));
  }

  let props = {
    title: 'The app on loading ...'
  };

  return <Modal {...props}>
     <div className="loading-wrapper">
      <div className="wrapper-loader">
        <div className="loader">Loading...</div>
      </div>
      {
        message && message.length &&
        <div className="message">{message.join(', ')}</div>
      }
    </div>
  </Modal>
}

export default ModalLoading;