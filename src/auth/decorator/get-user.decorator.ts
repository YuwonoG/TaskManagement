import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { User } from "../user.entity";

export const GetUser = createParamDecorator(
    // (data, req) : User  =>{
    //     return req.user;
    // }
    (data, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
    
        return data ? user && user[data] : user;
      },
    );