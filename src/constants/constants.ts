// 성별 옵션
export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
} as const

// 예/아니오 옵션
export const BOOLEAN_CHOICE = {
  YES: 'yes',
  NO: 'no',
} as const

// 성격 전달 목록
export const PERSONALITY = {
  EXTROVERTED: 'extroverted',
  INTROVERTED: 'introverted',
  // 다른 성격들도 여기에 추가
} as const

export const BREED_VALUES = ['Maltese', 'Golden Retriever', 'Poodle'] as const
export const DISEASE_VALUES = ['Joint', 'Heart', 'Bronchial'] as const

// 2. UI 선택 옵션용 데이터 (value와 label을 함께 관리)
export const BREED_OPTIONS_DATA = [
  { value: 'Maltese', label: '몰티즈' },
  { value: 'Golden Retriever', label: '골든리트리버' },
  { value: 'Poodle', label: '푸들' },
] as const

export const DISEASE_OPTIONS_DATA = [
  { value: 'Joint', label: '관절관련' },
  { value: 'Heart', label: '심장관련' },
  { value: 'Bronchial', label: '기관지관련' },
] as const

// 낮 날씨
export const DAY_WEATHER = {
  SUN: 'sun',
  CLOUDY: 'cloudy',
  RAIN: 'rain',
  SNOW: 'snow',
  WIND: 'wind',
} as const

// 밤 날씨
export const NIGHT_WEATHER = {
  MOON: 'moon',
  CLOUDY_NIGHT: 'cloudy-night',
  RAINY_NIGHT: 'rainy-night',
  SNOWY_NIGHT: 'snowy-night',
  WINDY_NIGHT: 'windy-night',
} as const

// 산책로 옵션
export const PREFERRED_PATHS = {
  ASPHALT: 'asphalt',
  TRAIL: 'trail',
  DIRT: 'dirt',
} as const

// 선택지 텍스트
export const UI_TEXT = {
  BREED_TYPE: '견종',
  SEX: '성별',
  PAGE_TITLE: '신규 반려동물 추가',
  BREED_MODAL_TITLE: '견종선택',
  DISEASE_MODAL_TITLE: '지병선택',
  SAVE_BUTTON: '저장하기',
  DETAIL_SECTION_TITLE: '상세설정',
  DAY_LABEL: '햇님',
  NIGHT_LABEL: '달님',
  DISEASE_LABEL: '지병',
  PATH_LABEL: '선호산책로',
  WEIGHT_LABEL: '몸무게',
  PERSONALITY_LABEL: '성격',
  SELECT_DISEASE_PLACEHOLDER: '지병 선택',
  SET_BUTTON: '설정하기',
  PERSONALITY_EXTROVERTED: '외향적',
  PERSONALITY_INTROVERTED: '내향적',
  BIRTH_DATE: '생년월일',
  NETURALIZE: '중성화여부',
  VACCINATED: '예방접종여부',
  YES: '예',
  NO: '아니오',
  BOY: '남아',
  GIRL: '여아',
} as const

// 단위 텍스트
export const UNIT_OF_MEASURE = {
  KG: 'kg',
}
