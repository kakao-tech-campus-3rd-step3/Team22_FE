# 충남대 4팀 FE
## 펫위워크
### 역할
- 리더: 김진서
- 테크리더: 장주형

초기 위치 설정하기 (내 위치 찍기)
→ 브라우저 navigator.geolocation.getCurrentPosition
→ 로컬 상태 관리(Zustand/Signals) 로 보관

날씨 정보 불러오기
→ OpenWeather, 기상청, 공공데이터 API 등 서버 호출 필요
→ React Query 사용 → 캐싱 / 에러 처리 / 자동 리패치까지 편리

걸어간 경로 추적하면서 선으로 그리기
→ navigator.geolocation.watchPosition 으로 주기적으로 좌표 수집
→ 수집된 좌표들을 배열로 저장해서 카카오맵 Polyline에 전달
→ 이것도 로컬 상태 관리(Zustand/Signals) 로 관리하는 게 효율적
(React Query는 서버에서 fetch 하는 데이터가 아니므로 오히려 불필요)
