import * as React from 'react';
import Modal from '../../../common/components/Modal';
import ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';

const ModalError = ({ error }: any) => {
  if (error) {
    let keys = Object.keys(error);
    let errorMessage: any[] = [];

    keys.forEach((key: string) => {
      if (error[key]) {
        errorMessage.push(<div className="message" key={key}>{key + ': ' + error[key]}</div>);
      }
    });

    if (errorMessage.length) {
      let props = {
        title: 'Oops, you got error!',
        footer: <Link to={ROUTES.HOME}>Back to Home</Link>
      };
      return <Modal {...props}>
        <div className="error-wrapper">{errorMessage}</div>
      </Modal>
    }
  }


  return <Modal/>
}

export default ModalError;