import { http, HttpResponse } from 'msw';
type Books = {
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
  items: Books[];
};
const mockDatabase: { books: Trending[] } = {
  books: [
    {
      total: '12',
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
        {
          isbn: '9788937473401',
          title: '급류',
          author: '정대건',
          description:
            '평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한 변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차 극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은 통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 서사로, 강렬한 문체와 함께 독자를 끌어들입니다. 인간의 내면을 탐구하는 이 작품은 전 세계 독자들에게 큰 영향을 미치며, 맨부커 국제상을 수상한 작품으로 그 가치를 입증했습니다. 당신이 알고 있던 일상의 경계를 넘는, 충격적이고도 심오한 이야기에 휘말리게 될 것입니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788937473401.jpg',
          price: '14000',
          publisher: '문학동네',
          pubDate: '2021-05-15',
        },
        {
          isbn: '9791139716146',
          title: '행동하지 않으면 인생은 바뀌지 않는다',
          author: '브라이언 트레이시',
          description:
            "브라이언 트레이시의 자기계발서로, 목표 달성의 핵심은 '행동'임을 강조합니다. 성공적인 삶을 위해 필요한 사고방식과 실천적인 전략을 제시하며, 독자들이 일상에서 변화를 실현하도록 돕습니다. 이 책은 목표 설정, 시간 관리 등 구체적인 방법을 통해, 행동이 인생을 바꾸는 열쇠임을 알려줍니다.",
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791139716146.jpg',
          price: '12000',
          publisher: '북하우스',
          pubDate: '2019-06-20',
        },
        {
          isbn: '9791193937150',
          title: '내가 원하는 것을 나도 모를 때',
          author: '전승환',
          description:
            '그저 하루하루 정신없이 살아내느라 자신이 정말 원하는 게 뭔지도 모른 채 무기력해진 이들에게 가슴 따뜻한 위로와 용기를 건넨 책은, 출간 직후 “앞이 깜깜해졌을 때 길을 열어준 책” “타인의 시선에서 벗어날 수 있게 해준 책” “깊은 위안으로 눈물을 멈추지 않게 한 책”이라는 찬사를 받으며 SNS에서 큰 화제를 불러일으켰고, 온·오프라인 독서모임의 수많은 독서광 사이에서도 극찬을 받으며 추천 릴레이가 이어졌다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193937150.jpg',
          price: '15000',
          publisher: '유유',
          pubDate: '2020-03-01',
        },
        {
          isbn: '9788936434120',
          title: '소년이 온다',
          author: '한강',
          description:
            '진심 어린 문장들로 무고한 영혼의 말을 대신 전하며 그 시절을 잊고 무심하게 살아가는 우리에게 묵직한 메시지를 던진다. 국가의 무자비함을 생생하게 그려내 지금까지도 우리나라뿐 아니라 전 세계에서 계속되고 있는 인간의 잔혹함과 악행에 대한 근원적인 질문을 던지고, 잊을 수 없는 봄날의 오월을 지나 여름을 건너가지 못한 이들과 살아남은 것이 오히려 치욕으로 여기며 매일을 힘겹게 견뎌내는 이들에게 우리가 어떤 대답을 해줄 수 있는 가를 간절한 목소리로 묻는다. 그리하여 우리가 붙들어야 할 역사적 기억이 무엇인지 생각하게 한다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434120.jpg',
          price: '18000',
          publisher: '문학동네',
          pubDate: '2016-04-25',
        },
        {
          isbn: '9788998441012',
          title: '모순',
          author: '양귀자',
          description:
            '삶의 공허함, 인간관계, 그리고 세상의 복잡성을 성찰하는 철학적 에세이다. 얇고 깊이 없는 인생에 대한 절망, 부모와의 관계, 상처와 은혜의 기억, 삶의 이중성을 통해 인간 존재의 본질을 탐구한다. 인생은 단순한 탐구 대상이 아니라, 살아가면서 배워가는 여정임을 깨닫게 한다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998441012.jpg',
          price: '16000',
          publisher: '청어람미디어',
          pubDate: '2013-10-21',
        },
        {
          isbn: '9791186757093',
          title: '자존감 수업',
          author: '윤홍균',
          description:
            '자존감을 높이기 위한 실천적 방법들을 다룬 책. 저자는 자존감을 회복하고 자신감을 가질 수 있도록 돕는 실질적인 조언을 제시하며, 어떻게 자기 자신을 사랑하고 존중하는지에 대해 이야기합니다. 자존감을 통해 인생의 다양한 문제를 극복하는 방법을 제시하고, 개인적 성장과 발전을 위한 중요한 도구로 활용할 수 있습니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791186757093.jpg',
          price: '15000',
          publisher: '심플라이프',
          pubDate: '2016-09-01',
        },
        {
          isbn: '9791196851200',
          title: '부의 인문학',
          author: '우석',
          description:
            '부와 경제에 관한 인문학적 접근을 다룬 책으로, 인문학적 사고를 통해 경제적 자유를 얻기 위한 방법을 제시합니다. 이 책은 경제의 복잡한 원리들을 이해하고, 그것을 어떻게 실생활에 적용할 수 있는지를 설명하며, 독자들에게 자산을 쌓고 더 나은 삶을 살기 위한 지혜를 제공합니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791196851200.jpg',
          price: '17000',
          publisher: '오픈마인드',
          pubDate: '2024-01-25',
        },
        {
          isbn: '9791196394509',
          title: '죽고 싶지만 떡볶이는 먹고 싶어',
          author: '백세희',
          description:
            '우울증과 자살을 소재로 한 이 책은 작가의 개인적인 경험을 바탕으로 한 고백적 이야기입니다. 삶의 끝자락에서 희망을 찾기 위한 여정과, 작은 것에서 행복을 발견하려는 노력, 그리고 스스로를 사랑하고 존중하려는 이야기들이 담겨 있습니다. 읽는 이로 하여금 삶의 소중함을 다시금 일깨워주는 작품입니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791196394509.jpg',
          price: '14000',
          publisher: '흔',
          pubDate: '2018-06-20',
        },
        {
          isbn: '9791195522125',
          title: '언어의 온도',
          author: '이기주',
          description:
            '이 책은 말의 힘과 그에 따른 영향력에 대한 이야기를 담고 있습니다. 저자는 일상 속에서 사용하는 언어가 사람들에게 어떻게 영향을 미치고, 그것이 어떻게 사람들의 마음을 움직일 수 있는지를 다룹니다. 좋은 언어의 힘과 그 중요성을 느낄 수 있는 감동적인 책입니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791195522125.jpg',
          price: '13800',
          publisher: '말글터',
          pubDate: '2017-12-15',
        },
        {
          isbn: '9791168342682',
          title: '그릿',
          author: '김주환',
          description:
            '‘그릿’은 성공의 열쇠는 재능이 아니라, 끈기와 열정이라는 메시지를 전달하는 책입니다. 저자는 그릿을 ‘열정과 끈기의 조합’으로 정의하며, 여러 연구를 통해 성공적인 사람들의 공통된 특성으로 그릿을 꼽습니다. 이 책은 어떻게 그릿을 키우고 적용할 수 있는지에 대한 전략과 방법을 제시하여, 개인의 성장과 목표 달성에 큰 도움이 될 것입니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791168342682.jpg',
          price: '16000',
          publisher: '인플루엔셜',
          pubDate: '2016-05-18',
        },
        {
          isbn: '9791193790403',
          title: '해리 포터와 마법사의 돌',
          author: 'J.K. 롤링',
          description:
            '해리 포터 시리즈의 첫 번째 책으로, 마법과 모험의 세계로 안내하는 이야기를 담고 있습니다. 평범한 소년 해리 포터가 마법학교인 호그와트에 입학하며 시작되는 신비롭고 흥미진진한 모험은 독자들에게 상상력을 자극하고, 우정, 용기, 희생의 가치를 전달합니다. 전 세계적으로 큰 사랑을 받은 이 책은 판타지 문학의 클래식으로 자리매김하고 있습니다.',
          image:
            'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193790403.jpg',
          price: '12500',
          publisher: '문학수첩',
          pubDate: '2000-05-05',
        },
      ],
    },
  ],
};
const productsResolver = () => {
  return HttpResponse.json({ mockDatabase });
};

export const bookHandler = [
  http.get('http://localhost:5000/books1', productsResolver),
];
