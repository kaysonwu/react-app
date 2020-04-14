/**
 * An *action* is a plain object that represents an intention to change the
 * state. Actions are the only way to get data into the store. Any data,
 * whether from UI events, network callbacks, or other sources such as
 * WebSockets needs to eventually be dispatched as actions.
 *
 * Actions must have a `type` field that indicates the type of action being
 * performed. Types can be defined as constants and imported from another
 * module. It's better to use strings for `type` than Symbols because strings
 * are serializable.
 *
 * Other than `type`, the structure of an action object is really up to you.
 * If you're interested, check out Flux Standard Action for recommendations on
 * how actions should be constructed.
 * 
 *
 * @template T the type of the action's `type` tag.
 */
type Action<T = any> = {
  type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent types that extend `Action` from
 * having an index signature.
 */
interface AnyAction extends Action {
  // Scaffolding contract members, Not part of redux.
  payload?: any;
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

type Reducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S

type Effect<A extends Action = AnyAction> = (
  saga: typeof import('redux-saga/effects'),
  action: A
) => Generator

type EffectEvent<A extends Action = AnyAction> = (
  // Redux saga
  saga: typeof import('redux-saga/effects'),
  // Model id
  id: string,
  // Effect name
  effect: string,
  // Effect action
  action: A
) => Generator

interface IModel<S = any, A extends Action = AnyAction> {

  /**
   * Model id.
   */
  id: string;

  /**
   * Redux state.
   */
  state: S | ((request?: import('http').IncomingMessage) => Promise<S>);

  /**
   * Redux reducers.
   */
  reducers: Record<string, Reducer<S, A>>,

  /**
   * Redux saga effects.
   */
  effects?: Record<string, Effect<A>>;

  /**
   * File name of dependent model.
   */
  dependencies?: string[];

  /**
   * Trigger before any model call effect.
   */
  effecting?: EffectEvent<A>;

  /**
   * Trigger after any model call effect.
   */
  effected?: EffectEvent<A>
}
