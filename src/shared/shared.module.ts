import { Module, HttpModule, Provider } from '@nestjs/common';
@Module({
  imports: [
    HttpModule,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class SharedModule {
  constructor(){
  }
}
