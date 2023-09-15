# 시계열 차트 with recharts

_원티드 프리온보딩 인턴십 4주차 기업과제_

## 프로젝트 소개

### 내용

원티드 프리온보딩 프론트엔드 인턴십 4주차 과제 내용을 구현한 프로젝트 입니다.

### 목표

주어진 데이터를 기반으로 시계열 차트 만들기

<br/>
<br/>

## 프로젝트 링크

[🔗Link](https://web-chart-with-recharts-eu1k2lllc2s1v2.sel3.cloudtype.app/)

FE 배포는 `Cloud Type`을 이용하였습니다.

<br/>
<br/>

## 프로젝트 실행 가이드

- 실행을 위해 다음 Node version이 필요합니다.
  [Node.js 18.17.0](https://nodejs.org/ca/blog/release/v18.17.0/)

- 실행 방법 (2가지 중 택 1)
  > 1. 배포 링크를 통한 접속
  > 2. ZIP 파일 다운로드 및 압축 풀기 후 코드 에디터로 실행
  > 3. 아래 커멘드를 이용한 실행

```bash
$ git clone https://github.com/H0onnn/chart-with-recharts.git
$ cd wanted-onboarding-04
$ npm install
$ npm run start
```

<br/>
<br/>

## 기술 스택

#### Development

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=Typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
<img src="https://img.shields.io/badge/Node.js v18 (LTS)-grey?style=for-the-badge&logo=nodedotjs">

#### Convention

![Static Badge](https://img.shields.io/badge/ESLINT%20-%20%23942894?style=for-the-badge&logo=ESLINT)
![Static Badge](https://img.shields.io/badge/PRETTIER%20-%20%23AE5E1A?style=for-the-badge&logo=PRETTIER)
<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm">

#### Route

![Static Badge](https://img.shields.io/badge/REACT%20ROUTER%20-%20%23F4AAAA?style=for-the-badge&logo=REACT%20ROUTER)

### Styling

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<br/>
<br/>

## 🚀 프로젝트 기술 구현 과정

#### [Assignment 1] JSON 데이터를 이용한 시계열 차트 만들기

- 1.1) 데이터 변환
  > 객체의 형태로 제공된 json data를 사용하기 위한 배열 형태로 Formmating 과정이 필요했습니다. 이에 다음과 같은 util function을 작성하여 제공된 데이터를 가공하여 사용했습니다.

```json
// 기존 데이터 형태

{
  "type": "Mock data",
  "version": 1.0,
  "response": {
    "2023-02-01 14:32:00": {
      "id": "성북구",
      "value_area": 46,
      "value_bar": 13111
    },
    "2023-02-01 14:32:05": {
      "id": "강남구",
      "value_area": 9,
      "value_bar": 19143
    },
    "2023-02-01 14:32:10": {
      "id": "노원구",
      "value_area": 79,
      "value_bar": 14798
    },
}
```

```ts
// dataTransform.ts

import { DataInterface } from '../constants/@types/types';
import data from '../data/data.json';

const transformData = (
  data: DataInterface,
): { key: string; id: string; value_area: number; value_bar: number }[] => {
  return Object.entries(data.response).map(([key, value]) => ({
    key,
    ...value,
  }));
};

const transformedData = transformData(data);

export default transformedData;
```

- 1.2) 시계열 차트 구현

  > 다양한 차트 라이브러리 중 React 컴포넌트를 기반으로 설계되어 다른 React 컴포넌트와의 사용이 자연스러우며, state에 따라 동적인 데이터 업데이트 및 커스텀이 용이한 'recharts' 라이브러리를 사용하여 시계열 차트를 구현했습니다. 하나의 차트 안에 Area, Bar 데이터를 모두 포함한 차트를 그리기 위해 recharts 에서 제공하는 'ComposedChart' 형식을 사용했습니다.

- 1.3) 차트 데이터의 대략적인 수치 표현
  > X축과 Y축에 표시되는 데이터의 수치 (tickItem이라 칭함) 를 보다 깔끔하게 출력하기 위해 tickItem의 형식을 Formmating 하는 util function을 작성하여 차트에 적용하였습니다.

```ts
// formatTickItem.ts

// Y축 수치에 천의 자리 단위수 표기
export const formatTooltipItem = (item: any): string => {
  return item.toLocaleString();
};

// X축 수치 날짜 형식 변환 (오후 00:00:00)
export const formatXAxisDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
```

#### [Assignment 2] 차트 호버 기능 구현

- 2.1) 툴팁 호버
  > 차트에 hover시 데이터 정보를 툴팁 형태로 나타내기 위해 recharts 에서 제공하는 `<Tootip />` 컴포넌트를 사용했습니다. Tootip 컴포넌트의 'labelFormatter' 속성과 JS의 'find' 메서드를 이용하여 hover된 데이터 항목의 레이블 값과 일치하는 항목을 찾아 해당 항목이 있을 시 항목의 id 값을 반환하도록 구현했습니다.

```tsx
<Tooltip labelFormatter={value => data.find(item => item.key === value)?.id} />
```

#### [Assignment 3] 차트 필터링 기능 구현

- 3.1) 버튼을 이용한 필터링
  > 버튼 클릭 시 해당 지역의 막대 데이터만 하이라이팅 되는 필터링 기능을 구현하기 위해 버튼을 mapping 하고 onClick 함수를 붙이는 방식을 사용했습니다. 제공된 데이터에서 중복되는 id (지역) 를 제거하기 위해 'new Set' 메서드를 이용하여 중복없는 배열을 만든 뒤, 해당 배열에서 button을 mapping 하도록 구현했습니다. 버튼의 onClick 함수에는 useState의 set 함수를 이용해 버튼 클릭 시 해당 id 값이 state에 저장하고, id 값을 가진 막대가 하이라이팅 되도록 구현했습니다.

```tsx
// ButtonContainer.tsx

import styled from 'styled-components';
import Button from './UI/Button';
import transformedData from '../utils/dataTransform';

const ButtonContainer = ({
  setSelectedId,
}: {
  setSelectedId: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  // id의 중복 제거
  const buttonArray = Array.from(new Set(transformedData.map(item => item.id)));

  return (
    <ButtonContainerWrapper>
      // 전체 버튼 클릭시 null을 반환하여 하이라이팅 적용 취소
      <Button size="small" onClick={() => setSelectedId(null)}>
        전체
      </Button>
      {buttonArray.map((id, index) => {
        return (
          <Button key={index} size="small" onClick={() => setSelectedId(id)}>
            {id}
          </Button>
        );
      })}
    </ButtonContainerWrapper>
  );
};

export default ButtonContainer;
```

- 3.2) 데이터 막대 클릭 필터링
  > 차트의 데이터 막대를 클릭했을 때 해당 막대가 가진 id와 동일한 막대를 하이라이팅 하는 기능을 적용하기 위해 recharts 에서 제공하는 `<Bar />` `<Cell />` 컴포넌트를 이용했습니다. Bar 컴포넌트에 onClick 속성을 이용하여 막대를 클릭했을 때 Cell 컴포넌트의 fill color가 적용되도록 구현했습니다.

```tsx
// Chart.tsx

<Bar
  yAxisId="right"
  dataKey="value_bar"
  // onClick 을 통한 id 값 state 저장
  onClick={data => setSelectedId(data.id)}
  fill={colors.primary}
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.id === selectedId ? colors.hover : colors.primary} />
  ))}
</Bar>
```

## 아키텍쳐

### 디렉토리 구조

```bash
wanted-onboarding-04
├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.tsx
│   ├── api
│   │   └── axios.ts
│   ├── components
│   │   ├── ButtonContainer.tsx
│   │   ├── UI
│   │   │   ├── Button.tsx
│   │   │   └── Header.tsx
│   │   └── chart
│   │       └── Chart.tsx
│   ├── constants
│   │   ├── @types
│   │   │   └── types.ts
│   │   └── colors.ts
│   ├── data
│   │   └── data.json
│   ├── index.css
│   ├── index.tsx
│   ├── layout
│   │   └── PageLayout.tsx
│   ├── pages
│   │   └── MainPage.tsx
│   ├── routes.tsx
│   └── utils
│       ├── dataTransform.ts
│       └── formatTickItem.ts
├── tsconfig.json
└── webpack.config.js
```
