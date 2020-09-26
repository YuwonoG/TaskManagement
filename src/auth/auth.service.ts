import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { JwtPayLoad } from './jwt/jwt-payload.interface';
import { UserRepository } from './user.repository';


@Injectable()
export class AuthService {
   
    constructor( 
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService,

    ){}
    async signUp(authCredentialDTO : AuthCredentialDTO):Promise<void>{
        
        return await this.userRepository.signUp(authCredentialDTO);
    }

    async signIn(authCredentialDTO : AuthCredentialDTO):Promise<{accessToken : string}>{
        // console.log(`Service. '${JSON.stringify(authCredentialDTO)}'`);
        const username = await this.userRepository.validateUserPassword(authCredentialDTO);
        if (!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload : JwtPayLoad = {username};
        const accessToken = await this.jwtService.signAsync(payload);
        
        return {accessToken};
    }
}
