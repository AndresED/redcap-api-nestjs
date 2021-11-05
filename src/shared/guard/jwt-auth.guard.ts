import {ExecutionContext,Injectable,CanActivate,HttpException,HttpStatus} from '@nestjs/common';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
    }
    async validateRequest(req){ 
        /* // // console.log(req.headers); */
      // console.log(req.headers.authorization)
      if (!req.headers.authorization||req.headers.authorization=='not_required_token') {
          throw new HttpException({ message: 'token_required' }, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      const token = req.headers.authorization.replace(/['"]+/g, '');
      /* // // console.log(token); */
      let payload;
      try {
        payload = jwt.decode(token, process.env.SECRET);
        if (payload.exp <= moment().unix()) {
            throw new HttpException({ message: 'token_expirate' }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
      } catch (ex) {
          throw new HttpException({ message: 'token_invalid' }, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      return true;
    }
}