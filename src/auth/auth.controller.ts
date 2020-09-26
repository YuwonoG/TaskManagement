import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO):Promise<void>{
        //console.log(`Controller. '${JSON.stringify(authCredentialDTO)}'`);
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO):Promise<{accessToken : string}>{
        //console.log(`Controller. '${JSON.stringify(authCredentialDTO)}'`);
        return this.authService.signIn(authCredentialDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user){
        console.log(user);
    }
}
