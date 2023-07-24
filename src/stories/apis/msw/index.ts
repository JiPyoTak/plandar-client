import { rest } from 'msw';
import type {
  Path,
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestRequest,
  RestContext,
} from 'msw';

import { SERVER_URL } from '@/constants';

const serverAPI = Object.keys(rest).reduce((newRest, key) => {
  const typedKey = key as keyof typeof rest;

  const handler = <
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
    Params extends PathParams<keyof Params> = PathParams,
    ResponseBody extends DefaultBodyType = DefaultBodyType,
  >(
    path: Path,
    resolver: ResponseResolver<
      RestRequest<RequestBodyType, Params>,
      RestContext,
      ResponseBody
    >,
  ) => {
    return rest[typedKey]?.(`${SERVER_URL}${path}`, resolver);
  };

  newRest[typedKey] = handler;

  return newRest;
}, {} as typeof rest);

export { serverAPI };
