import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bycrypt from 'bcrypt';
import { AuthCredentialDTO } from "./dto/auth-credential.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialDTO: AuthCredentialDTO):Promise<void>{
        const {username, password} = authCredentialDTO;
        

        const user = new User();
        user.salt = await bycrypt.genSalt();
        user.username = username;
        user.password = await this.hashPassword(password, user.salt);
        
        try{
            await user.save();
            //console.log(JSON.stringify(user));
        } catch(error){

            if (error.code === '23505'){
                throw new ConflictException('Username already exists');
            }
            else{
                throw new InternalServerErrorException();
            }
            
        }
    }

    private async hashPassword(password :string, salt : string){
        return bycrypt.hash(password, salt);
    }
    
    async validateUserPassword(authCredentialDTO : AuthCredentialDTO): Promise<string>{
        const {username, password} = authCredentialDTO;
        console.log(`validateUserPassword ${JSON.stringify({authCredentialDTO})}`);
        const user = await this .createQueryBuilder("user")
                                .select(['user.username', 'user.password', 'user.salt'])
                                .where('user.username = :usernameParam', {usernameParam : username})
                                .getOne();
        // const user = await this.findOne({username});
        console.log(`validateUserPassword ${JSON.stringify({user})}`);

        if (user && await user.validatePassword(password))
        {
            return username;
        }
        else{
            return null;
        }
        
    }
}