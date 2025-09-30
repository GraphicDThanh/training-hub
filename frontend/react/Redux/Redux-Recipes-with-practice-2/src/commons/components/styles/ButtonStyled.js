import styled from 'styled-components';

const ButtonStyled = styled.button.attrs({
  padding: props => (props.size === 'small' ? '2px 5px' : '5px 10px'),
  fontSize: props => (props.size === 'small' ? '12px' : '15px'),

  color: props => {
    if (props.primary) {
      return "#007bff";
    } else if (props.secondary) {
      return "#6c757d";
    } else {
      return props.bg;
    }
  }
})`
  color: white;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.color};

  border-radius: 4px;
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize};

  &:hover {
    opacity: 0.8;
  }
`;

export default ButtonStyled;