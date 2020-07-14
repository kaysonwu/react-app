import { KeyboardEvent, MouseEvent, useState, useMemo } from 'react';

type IState = string | number | boolean | undefined;

export interface Actions<T = IState> {
  setLeft: () => void;
  setRight: () => void;
  toggle: (value?: T | KeyboardEvent | MouseEvent) => void;
}

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue: R = !defaultValue as R,
): [D | R, Actions<D | R>] {
  const [state, setState] = useState<D | R>(defaultValue);
  const actions = useMemo(() => {
    // 切换返回值
    const toggle = (value?: D | R | KeyboardEvent | MouseEvent) => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined
        && Object.prototype.toString.call(value) !== '[object Object]') {
        setState(value as D | R);
      } else {
        setState(s => (s === defaultValue ? reverseValue : defaultValue));
      }
    };

    // 设置默认值
    const setLeft = () => setState(defaultValue);
    // 设置取反值
    const setRight = () => setState(reverseValue);

    return { toggle, setLeft, setRight };
  }, [defaultValue, reverseValue]);

  return [state, actions];
}

export default useToggle;
