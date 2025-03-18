//json-server로 안되는 백엔드 정보를 가공/처리 시뮬
import {setupWorker} from "msw/browser" 
import { reviewHandler } from './mypageHandlers/reviewHandler';
import { commentHandler } from "./mypageHandlers/commentHandler"
import { mypageHandler } from "./mypageHandlers/mypageHandler"
import { bookHandler } from './bookHandler';

export const worker = setupWorker(
  ...bookHandler,
  ...mypageHandler,
  ...reviewHandler,
  ...commentHandler
);
