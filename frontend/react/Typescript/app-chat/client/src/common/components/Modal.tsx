import * as React from 'react';
interface Props {
  title?: string,
  footer?: any,
  children?: any,
};

const Modal = (props: Props) => {
  const  { title, footer } = props;
  return (
    <div className="modal-wrapper">
      <div className="model-dialog">
        <div className="modal-content">
          {
            title &&
            <div className="modal-header">
              <h4 className="title">{title}</h4>
            </div>
          }
          {
            props.children &&
            <div className="modal-body">
              {props.children}
            </div>
          }
          {
            footer &&
            <div className="modal-footer">{footer}</div>
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;