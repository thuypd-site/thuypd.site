export interface DomainAlternative {
  tld: string;
  fullDomain: string;
  isAvailable: boolean;
  pricePerYear: string;
}

export interface DomainCheckResult {
  domain: string;
  tld: string;
  fullDomain: string;
  isAvailable: boolean;
  pricePerYear: string;
  message: string;
  details?: {
    registrar?: string;
    createdDate?: string;
    expiresDate?: string;
    nameservers?: string[];
  };
  alternatives?: DomainAlternative[];
}

