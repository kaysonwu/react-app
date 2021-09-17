import type {
  FormInstance,
  NamePath,
  RuleObject as RuleObjectBase,
  StoreValue,
} from 'rc-field-form/lib/interface';

type ValidateMessage = string | (() => string);
type ValidateOption = {
  messages: Record<string, ValidateMessage>;
};

interface ValidatorRule {
  asyncValidator: Validator;
}

export type RuleObject = Partial<ValidatorRule> & RuleObjectBase;

export type Validator = (
  rule: RuleObject,
  value: StoreValue,
  done: (error?: ValidateMessage) => void,
  source: Record<string, StoreValue>,
  options: ValidateOption,
) => void | Promise<void | Error | ValidateMessage>;

export type RuleRender = (form: FormInstance) => RuleObject;
export { NamePath, StoreValue };
