# 🍊감귤마켓
<i>기간: 22.01 - 22.04</i>

[Deploy](https://mandarin-market-three.vercel.app/)


<br>

## 1. 프로젝트 소개
- 멋쟁이사자처럼 프론트엔드 스쿨 1기 팀 프로젝트로 진행한 감귤마켓입니다
- 상품을 등록, 판매하고 자신의 일상을 공유할 수 있는 SNS 마켓입니다

<br>

## 2. 스택
- React Hook
- Next.js
- TypeScript
- Emotion

<br>

## 3. 역할 분담
각 기능 별로 역할을 나누어 진행하였습니다

### 김정희
<i>[github/wjdgml3834](https://github.com/wjdgml3834)</i>
  - 홈 화면 게시글
  - 팔로우, 팔로우 취소
  - 게시글 복수 이미지 캐러셀
  - 팔로워, 팔로잉 페이지

### 이현호
<i>[github/LEEHYUNHO2001](https://github.com/LEEHYUNHO2001)</i>
  - next-auth를 이용한 로그인
  - 회원가입, 프로필 미리보기
  - 감귤마켓의 유저 검색
  - 좋아요 및 좋아요 취소
  - 프로필 수정

### 최성이
<i>[github/choisung2](https://github.com/choisung2)</i>
  - 게시글 등록, 수정, 삭제
  - 상품 등록, 수정, 삭제
  - 게시글 상세 페이지
  - 유저 프로필
  - 댓글 기능

<br>


## 4. 폴더 구조
<details>
<summary><i>펼쳐보기</i></summary>
<div markdown="1">       

```bash
├── src
│   ├── components
│   │   ├── BackButton.tsx
│   │   ├── Border.tsx
│   │   ├── Custom404.tsx
│   │   ├── Error.tsx
│   │   ├── Loading.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── ProfileUpdate.tsx
│   │   ├── developer
│   │   │   ├── Developer.tsx
│   │   │   └── Footer.tsx
│   │   ├── follower
│   │   │   ├── Card.tsx
│   │   │   ├── CardContainer.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Main.tsx
│   │   ├── following
│   │   │   ├── Card.tsx
│   │   │   ├── CardContainer.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Main.tsx
│   │   ├── home
│   │   │   ├── Card.tsx
│   │   │   ├── CardContainer.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Main.tsx
│   │   │   ├── Nonfeed.tsx
│   │   │   ├── ReportCancelModal.tsx
│   │   │   └── ReportModal.tsx
│   │   ├── layouts
│   │   │   ├── Layout.tsx
│   │   │   ├── StatusBar.tsx
│   │   │   └── index.tsx
│   │   ├── login
│   │   │   ├── Email.tsx
│   │   │   └── Main.tsx
│   │   ├── postDetail
│   │   │   ├── CoReportCancelModal.tsx
│   │   │   ├── Comment.tsx
│   │   │   ├── CommentDelModal.tsx
│   │   │   ├── CommentList.tsx
│   │   │   ├── CommentModal.tsx
│   │   │   ├── Container.tsx
│   │   │   └── DetailCard.tsx
│   │   ├── postUpload
│   │   │   ├── Container.tsx
│   │   │   ├── EditContainer.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── PostEdit.tsx
│   │   │   └── PostUpload.tsx
│   │   ├── product
│   │   │   ├── Container.tsx
│   │   │   ├── EditContainer.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── Modification.tsx
│   │   │   ├── ProductDeleteModal.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   └── Register.tsx
│   │   ├── profile
│   │   │   ├── Carousel.tsx
│   │   │   ├── CarouselCard.tsx
│   │   │   ├── DeleteModal.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Info.tsx
│   │   │   ├── LogOutModal.tsx
│   │   │   ├── MyContainer.tsx
│   │   │   ├── MyPostCard.tsx
│   │   │   ├── MyPostContainer.tsx
│   │   │   ├── MyProfileModal.tsx
│   │   │   ├── PostModal.tsx
│   │   │   ├── ProfileAppPost.tsx
│   │   │   └── ProfilePost.tsx
│   │   ├── research
│   │   │   ├── Card.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Main.tsx
│   │   └── signup
│   │       ├── SignUp.tsx
│   │       └── SignUpProfile.tsx
│   ├── constants
│   │   └── index.ts
│   ├── pages
│   │   ├── 404.tsx
│   │   ├── _app.tsx
│   │   ├── api
│   │   │   └── auth
│   │   │       └── [...nextauth].ts
│   │   ├── developer
│   │   │   └── index.tsx
│   │   ├── follow
│   │   │   └── [id]
│   │   │       ├── follower.tsx
│   │   │       └── following.tsx
│   │   ├── home
│   │   │   └── index.tsx
│   │   ├── home.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── post
│   │   │   ├── [...params].tsx
│   │   │   └── upload.tsx
│   │   ├── postdetail
│   │   │   └── [id].tsx
│   │   ├── product
│   │   │   ├── [...params].tsx
│   │   │   └── index.tsx
│   │   ├── profile
│   │   │   ├── [...params].tsx
│   │   │   ├── edit.tsx
│   │   │   └── index.tsx
│   │   ├── research.tsx
│   │   └── signup.tsx
│   └── types
│       ├── Comments.ts
│       ├── Follower.ts
│       ├── Following.ts
│       ├── MyPost.ts
│       ├── Posts.ts
│       └── Product.ts
```

</div>
</details>

### 실행 방법
```bash
$yarn dev
```

<br>

## 5. 기능

### 1) 홈

|로그인|회원가입|홈|
|:-:|:-:|:-:|
|![로그인](https://user-images.githubusercontent.com/92927950/163723636-c3ec1409-9995-4b89-9fc3-5d568d8f5977.gif)|![회원가입](https://user-images.githubusercontent.com/92927950/163723668-bd56f9d9-7db8-4740-8b4c-9ab7bf2f7951.gif)|![홈화면](https://user-images.githubusercontent.com/92927950/163723799-f7a96379-9f10-46e3-ad52-d7d6fcaa992a.gif)|


|계정검색(팔로우 O)|계정검색(팔로우 X)|개발자|
|:-:|:-:|:-:|
|![계정검색](https://user-images.githubusercontent.com/92927950/163723804-0f4d7b2e-a10f-488d-8f64-cb051b5466c9.gif)|![계정검색(팔로우x)](https://user-images.githubusercontent.com/92927950/163724271-ab6c5217-69cb-45b9-9cb3-5a7a12909985.gif)|![개발자](https://user-images.githubusercontent.com/92927950/163723807-482185a2-2976-4ada-9f88-11fe1e107e2c.gif)|

<br>

### 2) 프로필

|마이 프로필|팔로워|팔로잉|
|:-:|:-:|:-:|
|![프로필](https://user-images.githubusercontent.com/92927950/163724621-6799834c-a60b-456f-9cb6-0e00a606d68b.gif)|![팔로우](https://user-images.githubusercontent.com/92927950/163724680-aaf5c677-0966-4e29-a115-ece4f9a04618.gif)|![팔로잉](https://user-images.githubusercontent.com/92927950/163724682-2ffd9629-9746-4a7c-9fd0-511254ba2493.gif)

|프로필 수정|로그아웃|유저 프로필|
|:-:|:-:|:-:|
|![프로필 수정](https://user-images.githubusercontent.com/92927950/163724768-f57579d7-11c8-4e7b-af3c-52339c726805.gif)|![로그아웃](https://user-images.githubusercontent.com/92927950/163724985-317b398d-dbb5-47a3-9c43-71d7d60fbc42.gif)|![유저 프로필](https://user-images.githubusercontent.com/92927950/163725179-01ced3b3-5434-4621-990f-98dee10a580b.gif)|


<br>

### 3) 게시글

|작성|수정|삭제|
|:-:|:-:|:-:|
|![게시물 작성](https://user-images.githubusercontent.com/92927950/163723954-4fcb8a6d-a31c-4ae3-bc7d-2263cd2c9138.gif)|![게시물 수정](https://user-images.githubusercontent.com/92927950/163723957-8a7febc3-3c63-4f4a-9eaa-1808549df2b2.gif)|![게시물 삭제](https://user-images.githubusercontent.com/92927950/163723958-7aa3b5ed-83bb-4b2a-a3f9-2b51a5ffecdd.gif)|

|신고|댓글 작성|댓글 신고 및 삭제|
|:-:|:-:|:-:|
|![게시글 신고](https://user-images.githubusercontent.com/92927950/163724911-587de063-5aa1-42ea-8ed5-0cb0d94bdb9a.gif)|![댓글 작성](https://user-images.githubusercontent.com/92927950/163724838-e27a234b-ce27-40de-9f81-aca84f18805f.gif)|![댓글 신고 및 삭제](https://user-images.githubusercontent.com/92927950/163724837-ff92476f-0a2b-4ec0-afc0-3ba5b94d1bb6.gif)|

<br>

### 4) 상품

|등록|수정|삭제|
|:-:|:-:|:-:|
|![상품 등록](https://user-images.githubusercontent.com/92927950/163724024-ceb61044-9c50-4ae5-9887-33d9377ee03a.gif)|![상품 수정](https://user-images.githubusercontent.com/92927950/163724026-53f59a62-5b9e-4add-aa51-7df00633ab0d.gif)|![상품 삭제](https://user-images.githubusercontent.com/92927950/163724028-9ddf16aa-a5a2-4594-b9f8-10f87b5b04a9.gif)|

<br>

## 6. 느낀점
- 이번 프로젝트에서 Next.js, TypeScript 를 처음 접했습니다. 초반에는 어려운 부분이 많아 많이 헤맸지만 열심히 공부하며, 팀원분들과 소통하며 빠르게 성장할 수 있었던 것 같습니다. 배울 수 있는 기회가 많았던 프로젝트였습니다.
- 아쉬운 점은 1. 타입 스크립트 사용이 미흡했다는 점과 next에서 제공하는 dynamic 을 활용하지 못했다는 점입니다. 추후 리팩토링 시 any와 never 등의 타입은 대체할 예정이며, dynamic의 ssr 옵션 등을 활용해 보고 싶습니다.
