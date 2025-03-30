# Designable State Manager

> 설계 가능한 상태 관리자 라이브러리의 컨셉을 테스트해보고, 간단한 초안과 데모 페이지를 작성하기 위한 레포지토리입니다.

- [Description](#description)
- [How To Run](#how-to-run);
- [About Demo Project](#about-demo-project)
- [About Library](#about-library)

## Description

## How To Run

### 개발 환경 확인

```bash
# node 버전이 18 이상인 지 확인
node -v

# yarn berry를 사용하기 위한 준비
corepack enable

```

### 프로젝트 구동

```bash
# 의존성 설치
yarn

# pre-commit 훅 설치 (최초 1회만)
yarn prepare

# 개발 서버 구동
yarn dev

# 빌드 & 미리보기
yarn build
yarn preview
```

## About Demo Project

기획 문서는 [여기](https://designdefined.notion.site/cycloid-me-1a8a2cc05f2380229cfcfadbcec56637?pvs=4)에서 확인할 수 있습니다. 서비스의 주요 타입들은 `src/constant`와 `src/entity` 디렉토리를 함께 확인하시면 이해가 쉽습니다. 아래는 각 타입에 대한 간단한 설명입니다.

- `Goal`: 사용자가 달성하고자 하는 장기 목표. 시작 - 종료 시간을 가짐.
- `Cycle`: Goal에 속하여, 반복 주기(Interval)마다 초안(TaskDraft)에 따라 할 일(Task)들을 생성.
- `Task`: 할 일
  - `Task`: 이미 생성된 할 일.
  - `TaskDraft`: Cycle이 어떤 할 일을 생성할 지를 명시한 초안.
  - `TaskReserved`: Cycle의 특정 회차에 생성될 Task의 내용을 미리 명시해둔 것으로, 생성될 때 기존 TaskDraft의 내용에 덮어 씌워짐.
  - `QuickTask`: 아무 Cycle에 속하지 않는 1회성 할 일.
- `Achievement`: 달성할 수 있는 것
  - `Achievement`: Task에 속한 Achievement로, 달성 조건과 현재 상태를 가짐.
  - `AchievementDraft`: TaskDraft에 속한 Achievement로, 달성 조건만 명시.

## About Library

작성 중
