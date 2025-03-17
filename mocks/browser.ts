//json-server로 안되는 백엔드 정보를 가공/처리 시뮬
import {setupWorker} from "msw/browser" 
import { reviewHandler } from './reviewHandler';
// import { commentHandler } from './commentHandler.ts';

export const worker = setupWorker(
  ...reviewHandler,
  // commentHandler
);
