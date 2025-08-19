import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormTrigger,
  ValidationValueMessage,
} from 'react-hook-form';

export interface FormFieldInterface<T extends FieldValues> {
  field: FieldConfigInterface;
  control: Control<T>;
  getValues: UseFormGetValues<T>;
  trigger?: UseFormTrigger<T>;
  externalStyles?: Record<string, string>;
}

export interface OptionTypeInterface {
  value: string | number | null;
  label: string;
  shortLabel?: string;
}

export interface FieldConfigInterface {
  id: string;
  label?: string;
  type:
    | 'text'
    | 'select'
    | 'selectWithSmartSearch'
    | 'date'
    | 'time'
    | 'password'
    | 'textarea'
    | 'multiSelect'
    | 'checkbox'
    | 'button';
  isRequired?: boolean;
  validation?: (getValues: any, trigger?: any) => ValidationRules;
  handleValue?: (value: string) => number | string | null;
  options?: { value: number | string; label: string; shortLabel?: string }[];
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  isHide?: boolean;
  callback?: (data: any) => void;
  upperCase?: boolean;
  isInLine?: boolean;
  isShow?: boolean;
  isCenter?: boolean;
  isMulti?: boolean;
  dividedPosition?: number;
  isModifyOptions?: boolean;
  valueLength?: number;
  findOrder?: 'any' | 'start';
  noOptionsMessage?: () => string;
}

export interface ValidationRules {
  required?: ValidationValueMessage<boolean>;
  validate?: (value: string) => boolean | string;
}
