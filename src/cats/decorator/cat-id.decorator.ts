import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// get catId from request param
export const CatId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const catId = request.query.catId;

    if (!catId) return 0;

    if (!Number.isNaN(parseInt(catId))) {
      return parseInt(catId);
    }

    return 0;
  },
);
