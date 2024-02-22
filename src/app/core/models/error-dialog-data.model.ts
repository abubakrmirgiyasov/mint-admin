export interface ErrorDialogDataModel {
  message: string;
  details?: any;
}

export interface ProblemDetails {
  detail?: string;
  status?: number;
  title?: string;
  type?: string;
  [key: string]: any;
}
