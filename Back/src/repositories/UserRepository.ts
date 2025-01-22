import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser"

export const userRepository = AppDataSource.getRepository(User).extend({
   async saveUser(data: IUser): Promise<User> {
      const user = this.create({
         name: data.name,
         email: data.email,
         password: data.password
      });
   
      return this.save(user);
    }
})