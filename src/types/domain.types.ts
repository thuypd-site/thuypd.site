export interface DomainCheckResult {
  domain: string;
  tld: string;
  fullDomain: string;
  isAvailable: boolean;
  pricePerYear: string;
  message: string;
}
