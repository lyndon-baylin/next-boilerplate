import { ZodError, ZodIssue } from 'zod';

import { toast } from '@/components/toast-notification';

export function zodErrorHandler(error: any) {
  Object.keys(error.fieldErrors).forEach(key => {
    const { path, message } = error.fieldErrors[key][0];
    toast.error(`A ${path} ${message.toLowerCase()}`);
  });
}

export function errorHandler(error: ZodError | Error | AxiosCustomErrorType) {
  // Axios related error
  if (error.hasOwnProperty('code')) {
    toast.error(error.message);
    return;
  }

  if (error instanceof ZodError) {
    zodErrorHandler(
      error.flatten((issue: ZodIssue) => ({
        message: issue.message,
        errorCode: issue.code,
        path: issue.path[0],
      })),
    );
    return;
  }

  toast.error(error.message);
}
