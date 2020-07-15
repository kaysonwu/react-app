import { getQueryParams, put, post } from '@/utils/request';
import { SubmitEventHandler } from '@/components/drawer-form';
import { ErrorEventHandler } from '../interface';

export { SubmitEventHandler };

function createSubmit<T>(
  url: string,
  onStart: () => void,
  onSuccess: (isCreated: boolean, formVisible: boolean, record: T) => void,
  onError: ErrorEventHandler,
): SubmitEventHandler {
  return (record, value, form, formVisible) => {
    const isCreated = !record;
    const { id } = record || value;
    const { columns } = getQueryParams();
    const config = { form, params: { columns } };

    onStart();

    if (id) {
      put(`${url}/${id}`, value, config)
        .then(record => onSuccess(isCreated, formVisible, record))
        .catch(onError);
    } else {
      post(url, value, config)
        .then(record => onSuccess(isCreated, formVisible, record))
        .catch(onError);
    }
  };
}

export default createSubmit;
