import styled from 'styled-components';

export const InputFormControlStyled = styled.input.attrs({
    searchbar: props => props.searchbar ? {
        marginTop: "20px",
        width: "97%",
        borderRadius: "5rem",
    } : {},
})`
    width: ${props => (props.searchbar && props.searchbar.width) ? props.searchbar.width : "93%"};
    margin-top: ${props => (props.searchbar && props.searchbar.marginTop) ? props.searchbar.marginTop : "5px"};
    border-radius: ${props => (props.searchbar && props.searchbar.borderRadius) ? props.searchbar.borderRadius : ".25rem"};;
    display: "block";
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;