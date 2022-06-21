import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if (!data) return request.user
    else return request.user[data]
  },
)
