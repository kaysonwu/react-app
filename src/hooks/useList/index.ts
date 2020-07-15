import { Key, ReactNode, useReducer, useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ParamsType, RequestConfig } from '@/utils/request';
import AppContext from '@/components/application/context';
import { RecordType, DataSource, ErrorEventHandler } from './interface';
import { hasAction, getRealName } from './util';
import { SubmitEventHandler, DeleteEventHandler, RenderOptions, createQuery, createEdit, createSubmit, createdDelete, createRender } from './action';
import reducer, { DataType, State, StoredEventHandler, DeletedEventHandler } from './reducer';

export { DataSource };

interface Options<T, P = {}> extends Partial<RenderOptions<T>> {
  // 动作别名
  alias?: Record<string, string | ((record: T) => string)>;
  // 获取初始化表单道具
  getFormInitialProps?: () => Promise<P>;
  // 创建成功后的事件回调，可以通过它对数据进行更新
  created?: StoredEventHandler<T> | false;
  // 更新成功后的事件回调，可以通过它对数据进行更新
  updated?: StoredEventHandler<T> | false;
  // 删除成功后的事件回调，可以通过它对数据进行更新
  deleted?: DeletedEventHandler<T> | false;
}

export interface Actions<T> {
  onQuery: (params: ParamsType, renewal?: boolean, config?: RequestConfig) => void;
  onCreate?: () => void;
  onDelete?: DeleteEventHandler;
  onCloseForm?: () => void;
  onSubmit?: SubmitEventHandler;
  renderAction?: (id: Key, record: T) => ReactNode;
}

function useList<T extends RecordType, D = DataType<T>, P = {}>(
  url: string,
  initialData?: D,
  options: Options<T, P> = {},
) {
  const { formatMessage } = useIntl();
  const [state, dispatch] = useReducer(reducer, { data: initialData, formProps: {} } as State);
  const { routes } = useContext(AppContext);

  const actions = useMemo(() => {
    const { children = [] } = routes[routes.length - 1];
    const actions = children.filter(c => c.name !== 'New');

    const onError: ErrorEventHandler = error => dispatch({ type: 'error', error });
    const onQuery = createQuery(
      url,
      () => dispatch({ type: 'loading' }),
      (data: DataType<RecordType>) => dispatch({ type: 'saveData', data }),
      onError,
    );

    let { getFormInitialProps } = options;
    const openForm = (record?: T) => {
      const type = 'openForm';
      if (getFormInitialProps) {
        dispatch({ type, record, initialling: true });
        getFormInitialProps()
          .then(formProps => {
            getFormInitialProps = undefined;
            dispatch({ type: 'saveFormProps', formProps });
          })
          .catch(onError);
      } else {
        dispatch({ type, record });
      }
    };

    let onCreate; let onCloseForm; let onSubmit;
    let onDelete; let renderAction;

    if (actions.length < children.length) {
      onCreate = () => openForm();
    }

    if (onCreate || hasAction(actions, 'Edit')) {
      const {
        created = (data, record) => [record, ...data],
        updated = (data, record) => data.map(r => (r.id === record.id ? record : r)),
      } = options;
      const onSuccess = (isCreated: boolean, formVisible: boolean, record: RecordType) => {
        const stored = (isCreated ? created : updated) as StoredEventHandler<RecordType> | false;
        dispatch({ type: 'storeRecord', record, formVisible, stored });

        if (!stored) {
          onQuery({ page: undefined });
        }
      };

      onCloseForm = () => dispatch({ type: 'closeForm' });
      onSubmit = createSubmit(url, () => dispatch({ type: 'submitting' }), onSuccess, onError);
    }

    if (hasAction(actions, 'Delete')) {
      const { deleted = (data, ids) => data.filter(r => !ids.includes(r.id)) } = options;
      const onSuccess = deleted
        // @ts-ignore
        ? (ids: Key[]) => dispatch({ type: 'removeRecords', ids, deleted })
        : () => onQuery({ page: undefined });

      onDelete = createdDelete(url, formatMessage({ id: 'Deleting' }), onSuccess, onError);
    }

    if (actions.length > 0) {
      let { confirm, callback } = options;
      const { alias = {} } = options;
      const mapper = (name: string, record: T) => formatMessage({
        id: getRealName(alias, name, record),
      });

      confirm = { Delete: { title: formatMessage({ id: 'Are you sure delete?' }) }, ...confirm };
      callback = {
        ...callback,
        Delete: onDelete as DeleteEventHandler,
        Edit: createEdit(url, formatMessage({ id: 'Fetching' }), openForm, onError),
      };

      renderAction = createRender(actions, mapper, { ...options, confirm, callback });
    }

    return { onQuery, onCreate, onCloseForm, onSubmit, onDelete, renderAction };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, routes, formatMessage]);

  return [state, actions] as unknown as [State<T, D, P>, Actions<T>];
}

export default useList;
