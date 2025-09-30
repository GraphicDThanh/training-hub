using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using StoreManagement.Options;

namespace StoreManagement.Services;

public class EmailSender(
    IOptions<AuthMessageSenderOptions> optionsAccessor,
    ILogger<EmailSender> logger
    ) : IEmailSender
{
    // Set with Secret Manager.
    public AuthMessageSenderOptions Options { get; } = optionsAccessor.Value;

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        if (string.IsNullOrEmpty(Options.SendGridKey))
        {
            throw new ArgumentException("SendGridKey is null");
        }

        if (string.IsNullOrEmpty(Options.SenderEmail))
        {
            throw new ArgumentException("SenderEmail is null");
        }

        if (string.IsNullOrEmpty(Options.SenderRecoveryCode))
        {
            throw new ArgumentException("SenderRecoveryCode is null");
        }

        await Execute(Options.SendGridKey, subject, htmlMessage, email);
    }

    public async Task Execute(string apiKey, string subject, string message, string email)
    {
        var client = new SendGridClient(apiKey);

        var msg = new SendGridMessage()
        {
            From = new EmailAddress(Options.SenderEmail, Options.SenderRecoveryCode),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(email));

        // Disable click tracking.
        // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg);

        if (response.IsSuccessStatusCode)
        {
            logger.LogInformation("Email to {@email} queued successfully!", email);
        }
        else
        {
            logger.LogInformation("Failure Email to {@email}", email);
        }
    }
}
