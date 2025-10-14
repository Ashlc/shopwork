import { Injectable } from '@nestjs/common';
import { FrameworkService } from './framework/framework.service';

@Injectable()
export class AppService {
  constructor(private readonly frameworkService: FrameworkService) {}
}
