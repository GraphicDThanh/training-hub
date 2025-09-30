import styled from 'styled-components';

export const ModalDialog = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalContent = styled.div`
  width: 400px;
  position: relative;
  margin: 10% auto;
  border-radius: 4px;
  background: white;
  border: 1px solid #ccc;
  padding: 15px;
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid #efefef;
  padding-bottom: 10px;

  &:after {
    display: block;
    content: "";
    clear: both;
  }
`;

export const ModalHeaderTitle = styled.div`
  float: left;
  font-size: 18px;
  font-weight: 600;
`;

export const ButtonCloseModal = styled.button`
  float: right;
  margin: -5px -5px -5px auto;
`;

export const ThumbnailModalStyled = styled.img`
  width: 70px;
`;