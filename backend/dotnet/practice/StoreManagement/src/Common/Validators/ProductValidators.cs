using FluentValidation;
using StoreManagement.Constants;
using StoreManagement.DTOs;

namespace StoreManagement.Validators;

public class CreateProductDTOValidator : AbstractValidator<CreateProductDTO>
{
    public CreateProductDTOValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .MinimumLength(ProductConstants.NameMinLength)
                .WithMessage($"Product name must at least than {ProductConstants.NameMinLength} characters.")
            .MaximumLength(ProductConstants.NameMaxLength)
                .WithMessage($"Product name must not exceed {ProductConstants.NameMaxLength} characters.");

        RuleFor(x => x.Description)
            .MaximumLength(ProductConstants.DescriptionMaxLength)
                .WithMessage($"Product description must not exceed {ProductConstants.DescriptionMaxLength} characters.");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Product price must be greater than 0.");

        RuleFor(x => x.Quantity)
            .GreaterThan(ProductConstants.QuantityMin)
                .WithMessage($"Product quantity must be greater than {ProductConstants.QuantityMin}.")
            .LessThan(ProductConstants.QuantityMax)
                .WithMessage($"Product quantity must be less than {ProductConstants.QuantityMax}.");

        RuleFor(x => x.ImageUrl)
            .Must(x => string.IsNullOrEmpty(x) || Uri.IsWellFormedUriString(x, UriKind.Absolute))
                .WithMessage("Image url must be URI format.");
    }
}


public class UpdateProductDTOValidator : AbstractValidator<UpdateProductDTO>
{
    public UpdateProductDTOValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Product name is required.")
            .MinimumLength(ProductConstants.NameMinLength)
            .WithMessage($"Product name must at least than {ProductConstants.NameMinLength} characters.")
            .MaximumLength(ProductConstants.NameMaxLength)
            .WithMessage($"Product name must not exceed {ProductConstants.NameMaxLength} characters.");

        RuleFor(x => x.Description)
            .MaximumLength(ProductConstants.DescriptionMaxLength)
            .WithMessage($"Product description must not exceed {ProductConstants.DescriptionMaxLength} characters.");

        RuleFor(x => x.Price)
            .GreaterThan(0)
            .WithMessage("Product price must be greater than 0.");

        RuleFor(x => x.Quantity)
            .GreaterThan(ProductConstants.QuantityMin)
            .WithMessage($"Product quantity must be greater than {ProductConstants.QuantityMin}.")
            .LessThan(ProductConstants.QuantityMax)
            .WithMessage($"Product quantity must be less than {ProductConstants.QuantityMax}.");

        RuleFor(x => x.ImageUrl)
            .Must(x => string.IsNullOrEmpty(x) || Uri.IsWellFormedUriString(x, UriKind.Absolute))
            .WithMessage("Image url must be URI format.");
    }
}
