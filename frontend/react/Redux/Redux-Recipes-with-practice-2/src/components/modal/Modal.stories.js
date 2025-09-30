import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Modal from './Modal.js';

storiesOf('Modal', module)
  .add('Modal', () => (
    <Modal
      isShowModal="true"
      title="Testing Modal"
    >
    This is content of modal
    </Modal>
  ));
