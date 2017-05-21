# CS374 - prototype

Source codes are under ./src <br>
Main components are under
  ./src/app/routes/home
  ./src/app/shared

Belows are setting guide

## Setup
  npm install

## Run dev
  npm run start

## TODOs 
  We categorized our features by functionality.
  And distributed each job(todo) by category.

## 그냥 큰거 - 나중에
- [ ] 모바일 지원
- [ ] 상품 상세 페이지

## 정렬/검색 - 김휘수
- [ ] 상품리스트 정렬
- [ ] 상품 검색
- [ ] 카트 내에서의 정렬

## 그래프 시각화 - 송승환
- [ ] 그래프 가격에 따라 색상이 정해지도록
- [ ] 그래프 눈금 (가격 표시)
- [ ] 가격바 눌러서 상품 포커싱

## 멀티 아이템 - 재학
- [x] 동시 여러 아이템 삭제
- [x] aggregation
- [x] 장바구니에 넣을 때 아이템 갯수 설정
- [x] 카트 내에 아이템 갯수 설정

## 카트 UI - 진영
- [?] unfold/fold 비주얼 개선
- [x] 무료 배송 글자 바뀌기
- [x] 아이템 메타 객체 (P1)

## 기타 - 진영
- [x] 상품 갯수 확장
- [x] 숫자 포매팅

## 추가 - 나중에
- [ ] 무료 배송 시각화 개선 (아이콘 활용)
- [ ] 상품 카테고리

## 품종 - 공통 <- 승환
- [ ] 품종 (물, 세안제, 세제, 구강용품, 휴지/물티슈, 마스크)

## 카트 내 카드 개념 적용 <- 승환
- [ ] 카드  highlight on/off
- [ ] 체크박스가 카드의 highlight로 완전히 대체할지 안할지

## 품종 - 카트 <- 휘수
- [ ] 카트에 품종 필터 추가
- [ ] 품종 필터에 강조 표시 <- 품종별 설정된 갯수 초과 시 표시됨

## 품종 - 리스트 <- 휘수
- [ ] 아이템 리스트에서 품종 필터

## A/B 테스트 준비 
- [ ] component를 config에 따라 동적으로 선택할 수 있음
- [ ] 체크박스가 카드 선택 개념으로 바뀜

## 기타 <- 진영
- [ ] 검색 자동완성
- [x] fold/unfold 방향 바꾸기
- [x] 상세

## 크롤러 <- 재학
- [x] 크롤러 짜기
- [x] 품종당 상품 5개 이상 상품 추가

## issue
1. 카드 선택 개념과 품종 필터 개념이 도입 되었을 때 전체 선택의 기능과 직관성 확인 및 변경
