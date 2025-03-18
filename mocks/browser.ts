//json-server로 안되는 백엔드 정보를 가공/처리 시뮬
import {setupWorker} from "msw/browser" 

import { bookHandler } from './bookHandler';
// MyPage Handlers
import { mypageHandler } from './mypageHandlers/mypageHandler';
import { reviewHandler } from './mypageHandlers/reviewHandler';
import { meetingHandler } from './mypageHandlers/meetingHandler';
import { commentHandler } from './mypageHandlers/commentHandler';

export const worker = setupWorker(
  ...bookHandler,

  // Mypage Handlers
  ...mypageHandler,
  ...reviewHandler,
  ...meetingHandler,
  ...commentHandler,
);
