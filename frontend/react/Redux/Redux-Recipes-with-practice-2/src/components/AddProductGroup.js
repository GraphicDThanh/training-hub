import React from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/components/button/Button';

const AddProductGroup = ({
  toggleModal,
  handleGenerateProducts,
  handleGenerateSingleProduct
}) => {
  return (
    <div className="function-buttons">
      <Button
        primary
        text="Create new product"
        onClick={toggleModal}
      />
      <Button
        secondary
        text="Generate list products"
        onClick={handleGenerateProducts}
      />
      <Button
        secondary
        text="Generate single product"
        onClick={handleGenerateSingleProduct}
      />
    </div>
  );
}

AddProductGroup.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleGenerateProducts: PropTypes.func.isRequired,
  handleGenerateSingleProduct: PropTypes.func.isRequired
};

export default AddProductGroup;