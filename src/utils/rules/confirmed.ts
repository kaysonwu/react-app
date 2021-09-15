import type { NamePath, RuleRender } from './interface';

export default function confirmed(name: NamePath): RuleRender {
  return ({ getFieldValue }) => ({
    asyncValidator: (rule, value, done, source, options) =>
      done(!value || getFieldValue(name) === value ? undefined : options.messages.confirmed),
  });
}
