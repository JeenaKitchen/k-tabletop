export const getMoreRecipeSuggestions = (language) => {
  const isKo = language === 'ko';

  return [
    {
      title: isKo ? '딸기 찹쌀떡' : 'Strawberry Chapsaltteok',
      image: '/modal-images/strawberry-chap-sal-tteok.jpg',
      href: '/cafe-in-seoul/strawberry-chapsaltteok',
      label: isKo ? '서울 카페' : 'Cafe in Seoul',
    },
    {
      title: isKo ? '아이스 딸기 라떼' : 'Ice Strawberry Latte',
      image: '/modal-images/ice-strawberry-latte.jpg',
      href: '/cafe-in-seoul/ice-strawberry-latte',
      label: isKo ? '서울 카페' : 'Cafe in Seoul',
    },
    {
      title: isKo ? '팥빙수' : 'Pat-Bingsu',
      image: '/modal-images/pat-bing-su.jpg',
      href: '/cafe-in-seoul/pat-bingsu',
      label: isKo ? '서울 카페' : 'Cafe in Seoul',
    },
  ];
};
