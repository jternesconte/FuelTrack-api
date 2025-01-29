export interface UserDto {
   name: string,
   email: string,
   password: string
}

export interface userLoginDto {
   email: string,
   password: string
}

export interface UserRegisterDto {
   name: string,
   email: string,
   password: string,
   password2: string
}