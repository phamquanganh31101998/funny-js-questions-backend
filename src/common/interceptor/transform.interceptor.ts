import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  intercept(context: ExecutionContext, next: CallHandler) {
    const className = context.getClass();
    const handlerName = context.getHandler();

    // console.log({ className, handlerName });

    return next.handle();

    // return next.handle().pipe(map((data) => ({ data })));
  }
}
