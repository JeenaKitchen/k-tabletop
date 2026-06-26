export const FEATURED_COLLECTION_SLUG = 'jeenas-favourites-collections/strawberry-sandwich';

const strawberrySandwichIngredientItems = [
  {
    id: 'costco-strawberry',
    image: '/items-images/favourites/costco-strawberry.jpg',
    link: 'https://www.amazon.com.au/s?k=fresh+strawberries',
    names: { en: 'Costco Strawberry', ko: '코스트코 딸기' },
  },
  {
    id: 'soft-white-bread',
    image: '/items-images/favourites/Soft-white-sandwich-bread.jpg',
    link: 'https://www.amazon.com.au/s?k=white+sandwich+bread',
    names: { en: 'Soft white sandwich bread', ko: '부드러운 흰 식빵' },
  },
  {
    id: 'mixing-bowl',
    image: '/items-images/3SET MUJI STAINLESS STEEL MIXING BOWLS.jpg',
    link: 'https://www.amazon.com.au/s?k=stainless+steel+mixing+bowls',
    names: { en: 'Mixing Bowl', ko: '믹싱볼' },
  },
  {
    id: 'hand-mixer-whisk',
    image: '/items-images/favourites/Hand-Mixer-or-Balloon-Whisk.jpg',
    link: 'https://www.amazon.com.au/s?k=hand+mixer+balloon+whisk',
    names: { en: 'Hand Mixer or Balloon Whisk', ko: '핸드 믹서 또는 풍선 거품기' },
  },
  {
    id: 'thickened-cream',
    image: '/items-images/favourites/Thickened-cream-(Double-cream).jpg',
    link: 'https://www.amazon.com.au/s?k=thickened+cream+double+cream',
    names: { en: 'Thickened cream (Double cream)', ko: '농후 크림 (더블 크림)' },
  },
  {
    id: 'sugar-stevia',
    image: '/items-images/favourites/Sugar-or-Stevia.jpg',
    link: 'https://www.amazon.com.au/s?k=stevia+sweetener',
    names: { en: 'Sugar or Stevia', ko: '설탕 또는 스테비아' },
  },
  {
    id: 'cling-wrap',
    image: '/items-images/favourites/Wrap-(Cling-Wrap).jpg',
    link: 'https://www.amazon.com.au/s?k=cling+wrap',
    names: { en: 'Wrap (Cling Wrap)', ko: '랩 (클링 랩)' },
  },
  {
    id: 'butter-knife',
    image: '/items-images/favourites/Butter-Knife.jpg',
    link: 'https://www.amazon.com.au/s?k=butter+knife',
    names: { en: 'Butter Knife', ko: '버터 나이프' },
  },
];

const mapIngredientsForLanguage = (language) =>
  strawberrySandwichIngredientItems.map((item) => ({
    name: item.names[language === 'ko' ? 'ko' : 'en'],
    image: item.image,
    link: item.link,
  }));

const strawberrySandwichHero = {
  en: {
    breadcrumb: "Item / Jeena's favourites collections",
    blogBreadcrumb: "Blog / Jeena's favourites collections",
    title: 'Strawberry Cream Sandwich',
    meta: ['15mins', '4 servings'],
    description:
      'A popular spring dessert in Korea, this sandwich is beautifully geometric and pillowy-soft. The secret to a clean cut is chilling the sandwich while tightly wrapped.',
    recipeButton: 'Check the recipe',
    recipeLink: 'cafe-in-seoul/strawberry-sandwich',
    ingredientsTitle: 'Ingredients & Tools',
    heroImage: '/items-images/favourites/strawberry-sandwich.jpg',
    heroAlt: 'Strawberry cream sandwich on a plate',
    ingredients: mapIngredientsForLanguage('en'),
  },
  ko: {
    breadcrumb: '아이템 / 지나의 즐겨찾기 컬렉션',
    blogBreadcrumb: '블로그 / 지나의 즐겨찾기 컬렉션',
    title: '딸기 크림 샌드위치',
    meta: ['15분', '4인분'],
    description:
      '한국에서 인기 있는 봄 디저트로, 보기만 해도 기분 좋아지는 기하학적인 모양과 보들보들한 식감이 특징이에요. 깔끔하게 자르려면 샌드위치를 꽉 감싼 채로 차갑게 식히는 것이 비결입니다.',
    recipeButton: '레시피 확인하기',
    recipeLink: 'cafe-in-seoul/strawberry-sandwich',
    ingredientsTitle: '재료 & 도구',
    heroImage: '/items-images/favourites/strawberry-sandwich.jpg',
    heroAlt: '접시 위의 딸기 크림 샌드위치',
    ingredients: mapIngredientsForLanguage('ko'),
  },
};

const strawberrySandwichBlogContent = {
  en: {
    sections: [
      {
        type: 'heading',
        text: 'Why I love this sandwich',
      },
      {
        type: 'paragraph',
        text:
          'This strawberry cream sandwich is one of my favourite spring treats from Korean cafés — soft bread, fresh strawberries, and lightly sweetened cream in a clean, geometric slice.',
      },
      {
        type: 'heading',
        text: 'Ingredients',
      },
      {
        type: 'steps',
        items: [
          '4 slices soft white sandwich bread, crusts removed',
          '8–10 fresh strawberries, sliced',
          '1 cup thickened cream (double cream)',
          '2 tbsp sugar or stevia',
          '1 tsp vanilla extract',
        ],
      },
      {
        type: 'heading',
        text: 'Instructions',
      },
      {
        type: 'steps',
        items: [
          'Whip the cream with sugar and vanilla until soft peaks form.',
          'Spread cream generously on one side of each bread slice.',
          'Arrange strawberry slices in rows, then add another layer of cream.',
          'Top with the second slice, wrap tightly in cling wrap, and chill before slicing.',
        ],
      },
      {
        type: 'youtube',
        url: 'https://youtu.be/WjNX3pNa9Oo?t=48',
        title: 'Watch the recipe video',
      },
    ],
  },
  ko: {
    sections: [
      {
        type: 'heading',
        text: '이 샌드위치를 좋아하는 이유',
      },
      {
        type: 'paragraph',
        text:
          '딸기 크림 샌드위치는 한국 카페에서 즐기는 봄 디저트 중 하나예요. 부드러운 식빵, 신선한 딸기, 달콤한 크림이 깔끔하게 잘린 단면으로 만나는 맛이 정말 좋아요.',
      },
      {
        type: 'heading',
        text: '재료',
      },
      {
        type: 'steps',
        items: [
          '부드러운 흰 식빵 4장 (크러스트 제거)',
          '신선한 딸기 8–10개, 슬라이스',
          '농후 크림(더블 크림) 1컵',
          '설탕 또는 스테비아 2큰술',
          '바닐라 익스트랙 1작은술',
        ],
      },
      {
        type: 'heading',
        text: '만드는 방법',
      },
      {
        type: 'steps',
        items: [
          '크림에 설탕과 바닐라를 넣고 소프트 피크가 될 때까지 휘핑하세요.',
          '식빵 한쪽면에 크림을 넉넉히 발라주세요.',
          '딸기를 줄지어 올리고, 다시 크림을 덮어주세요.',
          '윗빵을 올린 뒤 랩으로 꽉 감싸 차갑게 식힌 다음, 깔끔하게 잘라주세요.',
        ],
      },
      {
        type: 'youtube',
        url: 'https://youtu.be/WjNX3pNa9Oo?t=48',
        title: '레시피 영상 보기',
      },
    ],
  },
};

export const featuredCollections = {
  [FEATURED_COLLECTION_SLUG]: {
    ...strawberrySandwichHero,
    blogContent: strawberrySandwichBlogContent,
  },
};

export const getFeaturedCollection = (slug, language) => {
  const entry = featuredCollections[slug];
  if (!entry) return null;
  return entry[language === 'ko' ? 'ko' : 'en'];
};

export const getFeaturedCollectionBlogContent = (slug, language) => {
  const entry = featuredCollections[slug];
  if (!entry?.blogContent) return null;
  return entry.blogContent[language === 'ko' ? 'ko' : 'en'];
};

export const getBlogPosts = (language) => {
  const lang = language === 'ko' ? 'ko' : 'en';

  return Object.entries(featuredCollections)
    .filter(([, entry]) => entry.blogContent)
    .map(([slug, entry]) => {
      const hero = entry[lang];
      const collectionName =
        hero.blogBreadcrumb?.split(' / ').slice(1).join(' / ') || '';

      return {
        slug,
        title: hero.title,
        description: hero.description,
        heroImage: hero.heroImage,
        meta: hero.meta,
        collectionName,
      };
    });
};

/** @deprecated Use getFeaturedCollection(FEATURED_COLLECTION_SLUG, language) */
export const featuredCollection = strawberrySandwichHero;
