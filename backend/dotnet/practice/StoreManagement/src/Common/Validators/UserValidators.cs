using FluentValidation;
using StoreManagement.DTOs;
using StoreManagement.Enums;

namespace StoreManagement.Validators;

public class SetRoleUserDTOValidator : AbstractValidator<SetRoleUserDTO>
{
    public SetRoleUserDTOValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Email is invalid.");

        RuleFor(x => x.RoleName)
            .NotEmpty().WithMessage("Role name is required.")
            .Must(x => x == UserRole.Admin || x == UserRole.User).WithMessage("Role name is invalid.");
    }
}
