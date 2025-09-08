// 성별 옵션
export const GENDER = {
  MALE: "male",
  FEMALE: "female",
} as const;

// 예/아니오 옵션
export const BOOLEAN_CHOICE = {
  YES: "yes",
  NO: "no",
} as const;

// 성격 옵션
export const PERSONALITY = {
  EXTROVERTED: "extroverted",
  INTROVERTED: "introverted",
  // 다른 성격들도 여기에 추가
} as const;

// 선택 모달 옵션 목록
export const BREED_OPTIONS = ["몰티즈", "골든리트리버", "푸들"];
export const DISEASE_OPTIONS = ["관절관련", "심장관련", "기관지관련"];

// UI 텍스트 (선택사항이지만, 일관성을 위해 포함)

export const DAY_WEATHER = {
  SUN: "sun",
  CLOUDY: "cloudy",
  RAIN: "rain",
  SNOW: "snow",
  WIND: "wind",
} as const;

export const NIGHT_WEATHER = {
  MOON: "moon",
  CLOUDY_NIGHT: "cloudy-night",
  RAINY_NIGHT: "rainy-night",
  SNOWY_NIGHT: "snowy-night",
  WINDY_NIGHT: "windy-night",
} as const;

// 산책로 옵션
export const PREFERRED_PATHS = {
  ASPHALT: "asphalt",
  TRAIL: "trail",
  DIRT: "dirt",
} as const;

// 👇 이 UI_TEXT 객체로 교체해주세요.
export const UI_TEXT = {
  // App.tsx에서 사용하는 상수
  PAGE_TITLE: "신규 반려동물 추가",
  BREED_MODAL_TITLE: "견종선택",
  DISEASE_MODAL_TITLE: "지병선택",
  SAVE_BUTTON: "저장하기",

  // DetailCharacterSection.tsx에서 사용하는 상수
  DETAIL_SECTION_TITLE: "상세설정",
  DAY_LABEL: "햇님",
  NIGHT_LABEL: "달님",
  DISEASE_LABEL: "지병",
  PATH_LABEL: "선호산책로",
  WEIGHT_LABEL: "몸무게",
  PERSONALITY_LABEL: "성격",
  SELECT_DISEASE_PLACEHOLDER: "지병 선택",
  SET_BUTTON: "설정하기",
  PERSONALITY_EXTROVERTED: "외향적",
  PERSONALITY_INTROVERTED: "내향적",
} as const;
