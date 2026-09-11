import { useMutation } from '@tanstack/react-query';
import { checkDomainApi } from '../api/domain.api';
import { DomainCheckResult } from '../../../types/domain.types';

interface CheckDomainVariables {
  domain: string;
  tld: string;
}

export const useDomainCheck = () => {
  return useMutation<DomainCheckResult, Error, CheckDomainVariables>({
    mutationFn: ({ domain, tld }) => checkDomainApi(domain, tld),
  });
};
