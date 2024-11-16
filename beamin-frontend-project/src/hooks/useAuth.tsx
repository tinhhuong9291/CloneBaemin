import authAction from '@/actions/auth.action';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authAction.login,
  });
};
