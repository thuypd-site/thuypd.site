import { useMutation } from '@tanstack/react-query';
import { submitContactQuoteApi } from '../api/quote.api';
import { ContactFormInput } from '../../../schemas/contact.schema';

export const useContactMutation = () => {
  return useMutation({
    mutationFn: (data: ContactFormInput) => submitContactQuoteApi(data),
  });
};
