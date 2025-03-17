import { http } from 'msw';
type Items = {
  isbn: string;
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  publisher: string;
  pubDate: string;
};
type Trending = {
  total: string;
  items: Items[];
};
const mockDatabase: { books: Trending[] } = {
  books: [
    {
      total: '777',
      items: [
        {
          isbn: '9788936434595',
          title: '채식주의자',
          author: '한강',
          description:
            '평범한 여성 영혜가 육식을 거부하면서 벌어지는 충격적인 변화를 그린 작품입니다. 가족과 사회의 억압 속에서 그녀는 점점 더 극단적인 선택을 하며, 인간의 본능과 광기에 대한 깊은 질문을 던집니다. 아름답지만 잔혹한 서사, 강렬한 문체로 전 세계를 사로잡은 맨부커 국제상 수상작! 당신이 알던 일상의 틀이 완전히 뒤흔들릴 것입니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788936434595.jpg',
          price: '13000',
          publisher: '문학동네',
          pubDate: '2007-11-13',
        },
      ],
    },
    {
      total: '999',
      items: [
        {
          isbn: '1111111111111',
          title: '채식주의자',
          author: '한강',
          description:
            'test test test 육식을 거부하면서 벌어지는 충격적인 변화를 그린 작품입니다. 가족과 사회의 억압 속에서 그녀는 점점 더 극단적인 선택을 하며, 인간의 본능과 광기에 대한 깊은 질문을 던집니다. 아름답지만 잔혹한 서사, 강렬한 문체로 전 세계를 사로잡은 맨부커 국제상 수상작! 당신이 알던 일상의 틀이 완전히 뒤흔들릴 것입니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788936434595.jpg',
          price: '11111',
          publisher: '문학동네',
          pubDate: '2007-11-13',
        },
      ],
    },
  ],
};

export const bookHandler = [
  http.get('http://localhost:5000/books', ({ request }) => {
    const url = new URL(request.url);
    // Service Worker안에서 console.log는 브라우저 console에 출력안됨
    // Service Worker Console 에서 볼수있음 (어딧는지...)
    console.log(`URL: ${url}`);
    console.log(`mockDATABASE: ${mockDatabase}`);
    console.log(`BOOKS: ${mockDatabase.books}`);
    //mockdata 사용을 안해서 console.log, response에 안뜸
    // reviewHandler 보면서 url, mockdata 활용해보시길
    // 시간되면 msw 공식문서참고


    return new Response(JSON.stringify({ error: 'ERROR' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
