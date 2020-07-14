import React, { createContext, FC, ReactElement } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { IAnimObject } from 'rc-tween-one/typings/AnimObject';
import Table, { TableProps } from './table';

interface Context {
  backgroundColor?: string;
  isPageTween?: boolean;
}

const Context = createContext<Context>({ backgroundColor: '#fffeee', isPageTween: false });

const BodyWrapper: FC = props => {
  function onComplete(e: { target: HTMLElement }) {
    e.target.style.height = 'auto';
  }

  const render = ({ isPageTween, backgroundColor }: Context) => {
    const enter: IAnimObject[] = isPageTween
      ? [
        { opacity: 0, duration: 0 },
        { height: 0, duration: 150, type: 'from', delay: 150, ease: 'easeOutQuad', onComplete },
        { opacity: 1, duration: 150, ease: 'easeOutQuad' },
      ]
      : [
        { opacity: 0, x: 30, backgroundColor, duration: 0 },
        { height: 0, duration: 200, type: 'from', delay: 250, ease: 'easeOutQuad', onComplete },
        { opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad' },
        { delay: 1000, backgroundColor: '#fff' },
      ];
    const leave: IAnimObject[] = isPageTween
      ? [
        { duration: 150, opacity: 0 },
        { height: 0, duration: 150, ease: 'easeOutQuad' },
      ]
      : [
        { duration: 250, opacity: 0 },
        { height: 0, duration: 200, ease: 'easeOutQuad' },
      ];

    return (
      <TweenOneGroup
        component="tbody"
        appear={false}
        exclusive
        enter={enter}
        leave={leave}
        {...props}
      />
    );
  };

  return (
    <Context.Consumer>
      {render}
    </Context.Consumer>
  );
};

const AnimateTable = <T extends object = {}>(
  {
    isPageTween,
    backgroundColor = '#fffeee',
    components = {},
    ...reset
  }: Context & TableProps<T>,
): ReactElement => (
  <Context.Provider value={{ isPageTween, backgroundColor }}>
    <Table<T>
      {...reset}
      components={{
        ...components,
        body: {
          ...components.body,
          wrapper: BodyWrapper,
        },
      }}
    />
  </Context.Provider>
  );

export default AnimateTable;
