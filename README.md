# 🐾 펫위 워크 (PetWe Walk): 반려견을 위한 스마트 산책 도우미

펫위 워크는 반려견에게 가장 완벽한 산책을 선물하기 위해 탄생한 웹 애플리케이션입니다.

각 반려견의 고유한 특성과 실시간 외부 환경 요소를 정밀하게 분석하여 보호자의 고민을 해결하고 최적의 산책 경로를 추천합니다.

**백엔드**: <a href="https://github.com/kakao-tech-campus-3rd-step3/Team22_BE">Team22_BE</a>

# 주요 기능
## 1. 반려견 상세 프로필
- 견종, 나이, 몸무게, 특정 질병(관절, 호흡기 등) 등 반려견의 중요한 정보를 등록하고 관리합니다.
- 반려견의 정보에 따라 맞는 산책 정보를 제공합니다.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/21cf33f1-b72d-47df-9ab4-d58a4fc563b1" />

## 2. 실시간 경로 탐색
- 저희 서비스의 핵심 기능으로, 개인 맞춤형 경로 점수(PRS)를 계산하여 현재 다니고 있는 산책로가 나의 반려견에게 맞는 산책길인지를 판단해줍니다.
- **반려견 데이터**: 더위/추위 민감도, 건강 상태, 크기 등을 고려합니다.
- **환경 데이터**: 현재 기온, 습도, 미세먼지(PM2.5) 농도는 물론, 반려견의 발바닥 보호를 위한 '아스팔트 예측 온도'까지 계산에 포함합니다.
- **경로 데이터**: 길의 종류(아스팔트, 흙길, 잔디)와 경사도를 분석합니다.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/287eafa3-abd4-4181-9028-f18a9cc1a86e" />

## 3. 산책 위험 지수
- 현재 날씨 상태가 산책에 적합한지 '쾌적', '주의', '위험', '매우 위험' 등급으로 명확하게 알려주어 안전한 산책 결정을 돕습니다.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/e4ae4fc0-3de8-454c-8275-d68b6de3f720" />

## 4. 산책 커뮤니티
- 반려견을 키우는 사람들이 서로의 일상을 공유하면서 산책 이야기를 공유할 수 있도록 해줍니다.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/2d18f083-7628-4327-a031-23b0ce4a9b0d" />

# 기술 스택
<table>
  <tr>
    <th>Framework / Library</th>
    <th>Styling</th>
    <th>State & Data</th>
    <th>Routing</th>
    <th>UI / Interaction</th>
    <th>3D / Geo / Calendar</th>
    <th>Dev Tools</th>
  </tr>
  <tr>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/React%20DOM-61DAFB?logo=react&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/TanStack%20Router-FF6B00?logo=typescript&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/HeadlessUI-000000?logo=tailwindcss&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Lottie-000000?logo=lottie&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/React%20Hot%20Toast-FFB300?logo=react&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/React%20Icons-E91E63?logo=react&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/React--Three--Fiber-000000?logo=three.js&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Three%20Drei-000000?logo=three.js&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/FullCalendar-56AED4?logo=calendar&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Geolib-2B90D9?logo=mapbox&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black" /><br />
      <img src="https://img.shields.io/badge/Husky-000000?logo=github&logoColor=white" />
    </td>
  </tr>
</table>

# 시스템 구조
<img width="914" height="610" alt="image" src="https://github.com/user-attachments/assets/09fb5721-b072-49d8-ab2c-afdab3f747e6" />

# 실행
`npm install` 후, `npm run dev`로 실행하면 됩니다.

# 멤버
<table>
  <thead>
    <tr>
      <th>멤버</th>
      <th>이미지</th>
      <th>역할</th>
      <th>구현 내용</th>
      <th>깃허브</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>김진서</b></td>
      <td><img width="100" alt="image" src="https://github.com/user-attachments/assets/6e4234eb-752c-4454-954f-3778fee15b99" /></td>
      <td>Leader</td>
      <td>코드 리팩토링 <br> 로그인 <br> 반려견 설정 <br> 커뮤니티 </td>
      <td><a href="https://github.com/meem3443" target="_blank">meem3443</a></td>
    </tr>
    <tr>
      <td><b>장주형</b></td>
      <td><img width="100" alt="image" src="https://github.com/user-attachments/assets/1103d7f6-6879-42a3-bf93-906c91180c49" /></td>
      <td>FE Tech Leader</td>
      <td>날씨 <br> 산책 설정 <br> 실시간 경로 탐색 </td>
      <td><a href="https://github.com/JuHyeong424" target="_blank">JuHyeong424</a></td>
    </tr>
  </tbody>
</table>

