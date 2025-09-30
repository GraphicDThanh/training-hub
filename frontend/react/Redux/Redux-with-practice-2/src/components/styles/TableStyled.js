import styled from 'styled-components';

export const ProductTableStyled = styled.ul`
  border: 1px solid #ddd;
  list-style: none;
  padding: 0;
`;

export const TableHeaderStyled = styled.div`
  font-weight: 600;

  &.id {
    width: 10%;
  }

  &.name {
    width: 50%;
  }

  &.price {
    width: 20%;
  }

  &.image {
    width: 10%;
  }

  &.btn-edit {
    width: 10%;
  }
`;

export const TableRowStyled = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 20px;
  background-color: ${props => (props.index % 2 === 0) ? 'white' : '#f5f5f5'};

  & .id {
    width: 10%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .name {
    width: 45%;
  }

  & .price {
    width: 20%;
  }

  & .image {
    width: 5%;
  }

  & .buttons {
    margin-left: 20px;
  }

  & button:first-child {
    margin-right: 10px;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const TableRowHeaderStyled = TableRowStyled.extend`
  background-color: #e7eeff;
`;