// Services
import { getInvoices, getInvoiceDetails } from "@/services";

// Mocks
import { MOCK_INVOICES, MOCK_INVOICE_DATA } from "@/mocks";

describe("invoices of services", () => {
  it("should call fetch data if getInvoices called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: MOCK_INVOICES,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getInvoicesRes = await getInvoices();
    expect(mockFetch).toHaveBeenCalled();
    expect(getInvoicesRes.data).toEqual(MOCK_INVOICES);
  });

  it("should throw an error if call getInvoices falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getInvoices();
    }).rejects.toThrow();
  });

  it("should call fetch data if getInvoiceDetails called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: MOCK_INVOICE_DATA,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getInvoiceDetailsRes = await getInvoiceDetails();
    expect(mockFetch).toHaveBeenCalled();
    expect(getInvoiceDetailsRes.data).toEqual(MOCK_INVOICE_DATA);
  });

  it("should throw an error if call getInvoiceDetails falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getInvoiceDetails();
    }).rejects.toThrow();
  });
});
