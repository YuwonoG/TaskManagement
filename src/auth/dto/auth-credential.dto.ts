import {IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class AuthCredentialDTO{
    @MinLength(4, {message: 'Username is too short'})
    @IsNotEmpty()
    @IsString()
    username : string;

    
    @MinLength(4, {message: 'Password is too short'})
    @IsNotEmpty()
    //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{ message: 'password too weak' })
    password : string;
   
}