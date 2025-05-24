export interface AppError {
    message: string;
    code?: string;
    details?: any;
  }
  
  export const handleError = (error: unknown): AppError => {
    console.error(error);
    
    if (typeof error === 'object' && error !== null) {
      const err = error as Record<string, any>;
      
      return {
        message: err.message || 'An unknown error occurred',
        code: err.code || 'UNKNOWN_ERROR',
        details: err.details || null
      };
    }
    
    if (typeof error === 'string') {
      return {
        message: error,
        code: 'CUSTOM_ERROR'
      };
    }
    
    return {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR'
    };
  };
  
  export const toastError = (error: unknown) => {
    const { message } = handleError(error);
    toast.error(message);
  };