namespace StoreManagement.Options;

public class AuthMessageSenderOptions
{
    public string? SendGridUser { get; set; }
    public string? SendGridKey { get; set; }

    public string? SenderEmail { get; set; }
    public string? SenderRecoveryCode { get; set; }
}
