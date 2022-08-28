// interface expressAsyncHandler<
//   P = core.ParamsDictionary,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = core.Query,
//   >(handler: (...args: Parameters<express.RequestHandler<P, ResBody, ReqBody, ReqQuery>>) => void | Promise<void>):
// express.RequestHandler<P, ResBody, ReqBody, ReqQuery>;

import { ParamsDictionary, Query } from "express-serve-static-core";
import { RequestHandler } from "express";

const asyncHandler = (
  fn: (
    ...args: Parameters<RequestHandler<ParamsDictionary, any, any, Query>>
  ) => void | Promise<void>
): RequestHandler<ParamsDictionary, any, any, Query> =>
  function asyncUtilWrap(
    ...args: Parameters<RequestHandler<ParamsDictionary, any, any, Query>>
  ) {
    const fnReturn = fn(...args);
    const next: any = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

export { asyncHandler };
