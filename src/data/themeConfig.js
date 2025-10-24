// Static theme configuration (backgrounds, videos, sounds, descriptions)
// Dishes will be loaded dynamically from markdown files, with fallback to static data
import { themes as staticThemes } from './themes';

export const themeConfig = [
  {
    name: "Korean Netflix Night",
    koreanName: "한국 넷플릭스 밤",
    notionThemeName: "Korean Netflix Night", // This should match the "Theme" select value in Notion
    description: "Set the vibe for your next K-drama binge with the trendiest Korean street snacks — from tteokbokki to corn dogs — perfect for a cozy night on the couch.",
    koreanDescription: "퇴근 후 넷플릭스 K-드라마와 함께하기 좋은 길거리 음식, 간식으로 편안한 시간을 즐겨보세요 — 떡볶이부터 핫도그까지 — 오늘도 고생 많았습니다.",
    /*background: "/Themes/korean-drama-night.jpg",*/
    video: "/Videos/korean-drama-night.mp4",
    sound: "/Sounds/korean-drama-night.mp3",
    dishes: staticThemes.find(t => t.name === "Korean Netflix Night")?.dishes || []
  },
  {
    name: "Korean BBQ Restaurant",
    koreanName: "한국 바베큐 레스토랑",
    notionThemeName: "Korean BBQ Restaurant",
    description: "Fire up the grill at one of Korea's hottest BBQ spots — loaded with juicy meats, crisp lettuce wraps, sizzling aromas, and endless banchan.",
    koreanDescription: "한국 삼겹살 노포집에서 먹던 추억을 떠올리며 가장 인기 있는 바베큐 메뉴를 즐겨보세요 — 육즙 가득한 고기, 바삭한 상추쌈, 지글지글한 향기, 그리고 끝없는 반찬들로 가득한 한국 삼겹살 식당 추억을 환기시킵니다.",
    /*background: "/Themes/korean-bbq-restaurant.jpg",*/
    video: "/Videos/korean-bbq-restaurant.mp4",
    sound: "/Sounds/korean-bbq-restaurant.mp3",
    dishes: staticThemes.find(t => t.name === "Korean BBQ Restaurant")?.dishes || []
  },
  {
    name: "Cafe in Seoul",
    koreanName: "서울 카페",
    notionThemeName: "Cafe in Seoul",
    description: "Step into a trendy Seongsu café with minimalist design and creative flair.\nExplore a modern Korean café menu, featuring desserts and drinks from Seoul's coolest neighborhood.",
    koreanDescription: "미니멀한 디자인과 창의적인 감각이 돋보이는 트렌디한 성수 카페에서 홀로 또는 친구들과 즐기는 시간 어떠세요? \n서울의 가장 멋진 카페를 집에서 즐길 수 있도록 지나키친을 통해 탐색하고 만들어 보세요.",
    /*background: "/Themes/korean-cafe.jpg",*/
    video: "/Videos/korean-cafe.mp4",
    sound: "/Sounds/korean-cafe.mp3",
    dishes: staticThemes.find(t => t.name === "Cafe in Seoul")?.dishes || []
  },
  {
    name: "Grandmother's House",
    koreanName: "할머니 집",
    notionThemeName: "Grandmother's House",
    description: "Step into a nostalgic Korean grand mother's house filled with warmth, tradition, and comforting sounds.\nDiscover classic homemade dishes like kimchi stew and banchan that bring back memories of family meals.",
    koreanDescription: "여름 방학이면 늘 찾아뵙던 할머니댁, 그리고 위로가 되는 소리로 가득한 향수를 불러일으키는 한국 할머니의 집으로 들어가보세요.\n 뭉근하게 조린 두부조림과 찌개등 전통 한국 레시피를 할머니 손 맛에서 느껴보세요.",
    /*background: "/Themes/korean-grandmother-house.jpg",*/
    video: "/Videos/grandmother-house.mp4",
    sound: "/Sounds/korean-grandmother-house.mp3",
    dishes: staticThemes.find(t => t.name === "Grandmother's House")?.dishes || []
  },
  {
    name: "Han River",
    koreanName: "한강 공원",
    notionThemeName: "Han River",
    description: "Relax by Seoul's Han River at sunset, surrounded by the easygoing vibe of parks, fireworks, and buskers.\nDiscover simple, shareable Korean foods perfect for a riverside picnic.",
    koreanDescription: "일몰 시간 서울의 한강공원에서 휴식을 취하며, 불꽃놀이, 그리고 버스커들의 편안한 분위기에 둘러싸여보세요.\n강변 피크닉에 완벽한 간단하고 나눌 수 있는 한국 음식과 간식으로 선산한 바람과 여유를 느껴보세요.",
    /*background: "/Themes/han-gang.jpg",*/
    video: "/Videos/han-gang.mp4",
    sound: "/Sounds/han-gang.mp3",
    dishes: staticThemes.find(t => t.name === "Han River")?.dishes || []
  },
  {
    name: "Korean Dining Room",
    koreanName: "한국 가정식",
    notionThemeName: "Korean Dining Room",
    description: "Experience the warmth of a typical Korean home meal with a spread of side dishes, soups, meats, and stews. Set in a nostalgic 2000s dining room, the scene brings back the sounds and feelings of everyday family life.",
    koreanDescription: "집으로 돌아오는 길, 대문 밖에서부터 엄마의 요리 냄새를 맡으며 주방으로 달려갔던 기억 있으신가요? 세상에서 가장 흔한 한국 집 반찬, 국, 고기, 찌개가 이제는 제일 먹고 싶은 한국음식으로 자리잡았습니다. 벌써부터 그리워지는 추억 가득한 엄마의 가정식의 따뜻함을 경험해보세요.",
    /*background: "/Themes/korean-dining-room.jpg",*/
    video: "/Videos/korean-dining-room.mp4",
    sound: "/Sounds/korean-dining-room.mp3",
    dishes: staticThemes.find(t => t.name === "Korean Dining Room")?.dishes || []
  },
  {
    name: "Namdaemun Market",
    koreanName: "남대문 시장",
    notionThemeName: "Namdaemun Market",
    description: "Dive into the heart of Seoul's liveliest market with trending street eats, bold local flavors, and the buzzing energy of Namdaemun.",
    koreanDescription: "전통시장에서 먹던 분식과 길거리 음식은 어린 저에게 많은 추억이 있는 곳입니다. 언제 들려도 전통시장의 활기찬 에너지는 음식만큼이나 그리워집니다. 남대문 시장에서 가장 인기 있는 길거리 음식을 즐겨보세요.",
    /*background: "/Themes/namdaemun-market.jpg",*/
    video: "/Videos/namdaemun-market.mp4",
    sound: "/Sounds/namdaemun-market.mp3",
    dishes: staticThemes.find(t => t.name === "Namdaemun Market")?.dishes || []
  },
  {
    name: "Pocha Night",
    koreanName: "불금 포장마차",
    notionThemeName: "Pocha Night",
    description: "Recreate Korea's most popular late-night vibe with spicy street food, soju, and the electric feel of a bustling pojangmacha under neon lights.",
    koreanDescription: "일반 식장에서는 찾아보기 어려운 이색적인 음식, 소주, 그리고 네온사인 아래 번화한 포장마차에서 가장 인기 있는 포장마차의 심야 분위기를 즐겨보세요. 밤새 달릴 준비 되셨나요?",
    /*background: "/Themes/pocha.jpg",*/
    video: "/Videos/pocha-night.mp4",
    sound: "/Sounds/pocha-night.mp3",
    dishes: staticThemes.find(t => t.name === "Pocha Night")?.dishes || []
  },
  {
    name: "Chuseok",
    koreanName: "추석",
    notionThemeName: "Chuseok",
    description: "Chuseok is a major Korean harvest festival celebrated with family gatherings, traditional foods, and ancestral rituals.\nIt's often called the Korean Thanksgiving, honoring gratitude for the year's harvest.",
    koreanDescription: "추석은 가족 모임, 전통 음식, 조상 제례와 함께 축하하는 한국의 주요 수확 축제입니다.\n 모든 여성들의 고생이 많은 명절, 이제는 가족들과 함께 축하하는 날로 다같이 명절의 음식을 만들고 나눔의 의미를 경험해 보세요.",
    background: "/Themes/chuseok.jpg",
    sound: "/Sounds/chuseok.mp3",
    dishes: staticThemes.find(t => t.name === "Chuseok")?.dishes || []
  }
];