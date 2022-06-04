import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import keys from 'src/config/keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: keys.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    //payload= decoded jwt
    return { userId: payload.sub, username: payload.username };
  }
}
