/**
 * Types for Contact Form
 */

export interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  bottleneck: 'finops' | 'cicd' | 'stability' | 'migration' | 'other';
  message: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface ContactResponse {
  timestamp: string;
  fullName: string;
  email: string;
}

export type FormStatusType = 'idle' | 'loading' | 'success' | 'error';

export interface FormStatus {
  type: FormStatusType;
  message?: string;
}

export interface FormErrors extends Partial<ContactFormData> {}

/**
 * Bottleneck option type
 */
export interface BottleneckOption {
  value: ContactFormData['bottleneck'];
  label: string;
}
