// TODO: would come from config or something else
interface ApiOptions {
  version: string;
}

const api: ApiOptions = {
  version: 'v1',
};

export interface GetApiPathProps extends ApiOptions {
  context?: string;
}

export const getApiPath = (
  route: string,
  { version = api.version, context = '' }: GetApiPathProps = { version: api.version }
) => {
  if (context) {
    context = `/${context}`;
  }
  return `/api/${version}${context}/${route}`;
};
