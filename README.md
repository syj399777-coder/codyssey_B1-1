# 🚀 Vanilla JS 기반 반응형 포트폴리오 웹사이트

외부 라이브러리(React, Vue, Tailwind, Bootstrap 등) 없이 **순수 HTML, CSS, JavaScript(Vanilla JS)**만을 사용하여 제작한 반응형 포트폴리오 웹사이트입니다.

단순히 화면을 그리는 것을 넘어 **"사용자 이벤트 → 상태(State) 변경 → DOM 업데이트(화면 렌더링)"**로 이어지는 단방향 데이터 흐름 및 Web API 동작 원리를 체득하는 데 목적을 두고 설계되었습니다.

홈페이지 주소 : https://syj399777-coder.github.io/codyssey_B1-1/

---

### 💡 과제 학습 목표 및 핵심 개념 정리

#### 1. HTML 시맨틱 태그 사용 이유 및 구조 설계 기준
* **사용 이유**: 
  * **SEO(검색엔진 최적화)**: 검색엔진 로봇이 페이지 내부 콘텐츠의 구조와 중요한 정보를 정확하게 파악할 수 있습니다.
  * **웹 접근성(Accessibility)**: 스크린 리더를 사용하는 시각 장애인 사용자가 웹페이지를 시맨틱 구조에 맞춰 손쉽게 탐색할 수 있습니다.
  * **유지보수성**: 단순히 `div`만 채워진 코드보다 태그의 이름만 보고도 어떤 구역인지 빠르게 파악할 수 있어 개발자 간 협업에 유리합니다.
* **구조 설계 기준**:
  * 최상단 영역은 `<header>`, 주요 메뉴 모음은 `<nav>`로 구분했습니다.
  * 페이지의 본문 전체는 `<main>`으로 감싸고, 그 안에서 독립적인 주제를 가진 영역(Hero, About, Skills, Projects, Contact)별로 `<section>`을 나눴습니다.
  * 각 섹션 내에서 독립적인 하나의 완성된 콘텐츠(개별 프로젝트 카드 등)는 `<article>` 태그로 마크업했습니다.

---

#### 2. CSS Flexbox vs Grid 차이점 및 선택 기준
* **Flexbox (1차원 레이아웃)**:
  * **특징**: 수평(행) 또는 수직(열) 중 한쪽 방향으로 요소를 정렬하고 비율을 배분하는 데 최적화되어 있습니다.
  * **선택 이유**: `Header`의 로고와 메뉴 항목 좌우 정렬, `Footer`의 소셜 링크 정렬 등 요소들을 한 줄로 늘어놓고 간격을 맞추는 상황에서 적용했습니다.
* **Grid (2차원 레이아웃)**:
  * **특징**: 행(Row)과 열(Column)을 동시에 정렬하는 격자 형태의 레이아웃 구성에 최적화되어 있습니다.
  * **선택 이유**: `Projects` 카드 목록과 `Skills` 아이콘 목록처럼 화면 크기에 따라 여러 줄과 여러 칸으로 자연스럽게 재배치되어야 하는 구역에 적용했습니다. 특히 `repeat(auto-fit, minmax(280px, 1fr))` 구문을 사용하여 미디어 쿼리를 최소화한 반응형 카드 뷰를 구현했습니다.

---

#### 3. `querySelector`와 `addEventListener`를 통한 DOM 선택 및 이벤트 연결 흐름

// 1. DOM 요소 선택 (querySelector)
const themeToggleBtn = document.querySelector('#theme-toggle');

// 2. 이벤트 핸들러 함수 정의
const handleThemeToggle = () => {
    // 상태 변경 및 화면 업데이트 로직 실행
};

// 3. 이벤트 연결 (addEventListener)
themeToggleBtn.addEventListener('click', handleThemeToggle);

* **흐름 설명**: 브라우저가 HTML을 읽어 만든 DOM(Document Object Model) 트리에 `querySelector`로 접근하여 제어할 요소를 가져옵니다. 그 후 `addEventListener`를 통해 해당 요소에 `click`, `submit`, `scroll` 등의 이벤트 발생을 감지하는 '리스너'를 등록하여, 사용자가 동작을 취할 때 미리 지정한 함수가 즉시 실행되도록 연결합니다.

---

#### 4. ES6+ 핵심 문법 (화살표 함수, 구조분해 할당, 배열 메서드)
* **화살표 함수 (Arrow Function)**:
  * 기존 `function` 키워드보다 간결하게 함수를 선언할 수 있으며, 자신만의 `this`를 바인딩하지 않아 상위 스코프의 `this`를 그대로 참조하므로 이벤트 콜백 작성 시 유용합니다.
* **구조분해 할당 (Destructuring Assignment)**:
  * 객체나 배열에서 필요한 값만 바로 추출하여 변수로 선언합니다.
  * 예: `const { name, description, stargazers_count } = repo;` 처럼 작성하면 `repo.name`, `repo.description`으로 일일이 접근하지 않아도 되므로 가독성이 높아집니다.
* **배열 메서드 (`map` / `filter`)**:
  * **`filter`**: 조건에 맞는 데이터만 뽑아 새로운 배열을 만듭니다. (예: 사용자가 클릭한 언어별로 GitHub 프로젝트를 골라낼 때 사용)
  * **`map`**: 배열의 모든 요소를 순회하면서 지정한 형태(HTML 카드 템플릿 리터럴)로 변환해 새로운 배열을 반환합니다. (예: 객체 형태의 API 데이터를 화면에 보여줄 HTML 카드 문자열로 바꿀 때 사용)

---

#### 5. `fetch`와 `async/await`를 활용한 비동기 처리 및 UI 상태 표현
* **비동기 데이터 호출**:
  * `fetch` API를 사용하여 GitHub 서버에 비동기 네트워크 요청을 보냅니다. `async/await` 문법을 사용해 Promise 기반 비동기 코드를 동기적 코드처럼 깔끔하게 작성했습니다.
* **4가지 UI 상태 표현 (`try/catch` 분기)**:
  1. **로딩(Loading) 상태**: 데이터 요청이 시작되면 `state.isLoading = true`로 설정하고 화면에 로딩 스피너 애니메이션을 렌더링합니다.
  2. **성공(Success) 상태**: 데이터를 정상적으로 받아오면 `state.projects`에 저장하고 `map` 메서드를 통해 화면에 카드 리스트를 출력합니다.
  3. **실패(Error) 상태**: 네트워크 오류나 403 Rate Limit 발생 시 `catch` 블록으로 이동하여 "프로젝트를 불러올 수 없습니다"라는 에러 문구와 [다시 시도] 버튼을 렌더링합니다.
  4. **빈(Empty) 상태**: 불러온 프로젝트 배열의 길이가 0일 경우 "표시할 프로젝트가 없습니다" 메시지를 노출합니다.

---

#### 6. "이벤트 → 상태 변경 → DOM 업데이트" 흐름 (React 상태-렌더링 원리)
* **동작 원리**:
  1. **이벤트(Event)**: 사용자가 다크 모드 토글 버튼을 클릭하거나, 폼 입력값을 수정하거나, 필터 버튼을 클릭합니다.
  2. **상태 변경(State Change)**: 이벤트가 발생하면 DOM을 직접 하나하나 수정하지 않고, 먼저 앱의 데이터 상태를 보관하는 `state` 객체(`state.theme`, `state.filter` 등)의 값을 갱신합니다.
  3. **DOM 업데이트(Render)**: 변경된 `state` 값을 기반으로 렌더링 함수가 실행되어 필요한 DOM 부분만 최신 상태로 업데이트합니다.
* **의의**: 데이터(State)와 화면(UI)을 동기화함으로써, 앱의 규모가 커지더라도 상태 추적이 쉬워지고 유지보수가 용이해집니다. 이 패턴은 React 등 현대 프론트엔드 프레임워크의 단방향 데이터 흐름 원리의 기초가 됩니다.

---

## 🔗 배포 및 정보
- **배포 URL**: `https://<본인-GitHub-아이디>.github.io/<저장소-이름>/`
- **사용 기술**: HTML5, CSS3, JavaScript (ES6+)
- **개발 환경**: VS Code, Live Server

---

## 📌 주요 기능 (평가항목 1 검증)

| 기능 | 구현 및 검증 내용 |
| :--- | :--- |
| **반응형 레이아웃** | - 미디어 쿼리(`768px`, `1024px`)를 활용하여 모바일, 태블릿, 데스크톱 레이아웃 최적화<br>- 모바일 환경에서 네비게이션이 숨겨지고 햄버거 메뉴 버튼으로 전환 |
| **다크 모드** | - Header 우측 토글 버튼으로 라이트/다크 테마 즉시 전환<br>- `localStorage`에 상태를 저장하여 **페이지 새로고침 후에도 테마 유지가 가능** |
| **인터랙티브 UI** | - 모바일 햄버거 메뉴 토글 동작<br>- `IntersectionObserver` 기반 스크롤 감지 페이드인 애니메이션<br>- 스크롤 300px 이상 시 나타나는 '맨 위로 가기' 버튼 및 부드러운 스크롤(`scroll-top-btn`) |
| **GitHub API 연동** | - GitHub API(`https://api.github.com/users/{username}/repos`) 비동기호출<br>- **4가지 UI 상태 구별**: `로딩 스피너` / `성공(카드 리스트)` / `에러(메시지 및 재시도 버튼)` / `빈 데이터` |
| **Contact 폼 유효성 검증** | - 제출 시 `event.preventDefault()`로 기본 동작 방지<br>- 필수 값 누락 및 이메일 정규식 유효성 실패 시 **입력 필드 하단에 즉각적인 에러 메시지 표시** |

---

## 📝 평가항목 Q&A 및 핵심 질문 답변

### 📂 [평가항목 2] 구조 & 마크업 설계

#### Q1. HTML, CSS, JavaScript를 각각 분리한 이유와 각 파일의 역할은 무엇인가요?
* **관심사의 분리(Separation of Concerns, SoC)** 원칙을 준수하기 위해 분리했습니다.
  * **`index.html` (구조)**: 웹페이지의 뼈대와 정보 구조(Content)만을 담당합니다.
  * **`css/style.css` (표현)**: 레이아웃, 색상, 애니메이션 등 시각적 디자인(Presentation)을 담당합니다.
  * **`js/main.js` (동작)**: 사용자 이벤트 처리, API 연동, 동적 DOM 조작 등 비즈니스 로직(Behavior)을 담당합니다.
* **이점**: 코드의 가독성과 유지보수성이 크게 향상되며, 브라우저 캐싱을 통해 재방문 시 로딩 속도가 개선됩니다.

#### Q2. 시맨틱 태그(Semantic Tags)를 사용한 이유와 선택 기준은 무엇인가요?
문서의 의미와 구조를 명확히 하기 위해 `div` 남발을 지양하고 시맨틱 태그를 적용했습니다.
* **`<header>`**: 최상단 브랜드 로고, 네비게이션, 테마 토글 버튼을 포함하는 영구 영역에 사용했습니다.
* **`<nav>`**: 페이지 내부 주요 섹션 이동을 위한 앵커 링크 메뉴 모음에 사용했습니다.
* **`<main>`**: 페이지의 핵심 콘텐츠를 감싸는 본문 영역에 사용했습니다.
* **`<section>`**: Hero, About, Skills, Projects, Contact 등 독립적인 주제를 가진 콘텐츠 블록별로 구분하여 선택했습니다.
* **`<footer>`**: 저작권 표시, 소셜 링크 등 페이지 하단 부가 정보에 사용했습니다.
* **이점**: 검색엔진 최적화(SEO) 강화, 스크린 리더 사용자 등 웹 접근성(A11y) 보장, 개발자 간 코드 읽기 편의성 증대.

#### Q3. CSS 변수(`:root`) 사용의 이점은 무엇인가요?
* `:root`와 `[data-theme="dark"]` 선택자에 테마 색상, 폰트, 그림자 값 등을 중앙 집중식으로 정의했습니다.
* **이점**:
  1. **유지보수 용이**: 브랜드 컬러 변경 시 변수 하나만 수정하면 전체 프로젝트에 적용됩니다.
  2. **다크 모드 구현 간소화**: 테마 전환 시 전체 CSS를 수정할 필요 없이, `<html>`의 `data-theme` 속성 변경만으로 모든 요소의 색상이 동적으로 변경됩니다.

#### Q4. `onclick` 인라인 속성 대신 `addEventListener`를 사용한 이유는 무엇인가요?
* **`onclick` (인라인 방식)**: HTML 요소 내부에 JS 코드가 섞여 구조와 로직이 결합되며, 하나의 요소에 동일한 이벤트를 중복으로 등록할 수 없는 단점이 있습니다.
* **`addEventListener` (방식)**: HTML과 JS를 완전히 분리할 수 있고, 하나의 이벤트에 여러 개의 핸들러를 등록할 수 있으며, 캐치/버블링 옵션 제어 및 이벤트 위임이 가능하여 안정적인 이벤트 처리가 가능합니다.

---

### ⚙️ [평가항목 3] 코드 흐름 & 로직 이해

#### Q1. "이벤트 → 상태 변경 → 화면 업데이트" 흐름이 코드에서 어떻게 연결되나요?
**(예시: 다크 모드 토글 로직)**
1. **이벤트 발생**: 사용자가 다크 모드 버튼을 클릭합니다.
   ```javascript
   elements.themeToggle.addEventListener('click', () => { ... });
   2. **상태 변경**: 전역 `state.theme` 값을 전환하고 `localStorage` 상태를 갱신합니다.
   ```javascript
   state.theme = state.theme === 'light' ? 'dark' : 'light';
   ```
3. **화면 업데이트**: 변경된 상태를 바탕으로 DOM을 업데이트합니다.
   ```javascript
   elements.html.setAttribute('data-theme', state.theme);
   // CSS 변수가 자동으로 동기화되어 화면 전체 색상이 변경됨
   ```

#### Q2. `async/await`와 `try/catch`를 활용한 API 호출 성공/실패 분기 처리 흐름은 어떻게 되나요?

const fetchGitHubRepos = async () => {
    // 1. 요청 시작: 로딩 상태로 변경 및 UI 렌더링
    state.isLoading = true;
    renderProjectsState(); // <div class="spinner"></div> 출력

    try {
        const response = await fetch('[https://api.github.com/users/.../repos](https://api.github.com/users/.../repos)');
        
        // HTTP 에러 및 Rate Limit(403) 예외 처리
        if (!response.ok) {
            throw new Error(response.status === 403 
                ? 'API 요청 제한을 초과했습니다.' 
                : '데이터를 불러올 수 없습니다.');
        }

        // 2. 성공: 데이터 수락, 상태 업데이트 및 UI 출력
        const data = await response.json();
        state.projects = data;
        state.isLoading = false;
        renderProjects(); // 카드 리스트 출력
    } catch (err) {
        // 3. 실패: 에러 상태 업데이트 및 에러 UI 출력
        state.isLoading = false;
        state.error = err.message;
        renderProjectsState(); // 에러 메시지 + [다시 시도] 버튼 출력
    }
};


#### Q3. 배열 메서드(`map`, `filter`)를 사용한 카드 UI 동적 생성 단계
1. **필터링 (`filter`)**: 전체 저장소 배열 중 사용자가 선택한 언어 조건(`state.filter`)과 일치하는 프로젝트만 추출합니다.

   const filteredRepos = state.projects.filter(repo => repo.language === state.filter);
 
2. **변환 (`map`)**: 필터링된 객체 배열을 템플릿 리터럴(`HTML 문자열`) 배열로 1:1 변환합니다.
  
   const htmlArray = filteredRepos.map(repo => `
       <article class="project-card">
           <h3>${repo.name}</h3>
           <p>${repo.description}</p>
       </article>
   `);

3. **결합 및 렌더링 (`join`)**: 배열을 하나의 HTML 문자열로 결합하여 innerHTML에 삽입합니다.

   elements.projectsContainer.innerHTML = htmlArray.join('');


#### Q4. Flexbox와 Grid는 각각 어디에 적용하였고 왜 그 방식을 선택했나요?
* **Flexbox 적용 (`Header`, `Hero CTA`, `Footer`)**:
  * **이유**: 1차원(수평 또는 수직) 방향의 요소 정렬 및 공간 배분에 적합합니다. 네비게이션 바처럼 좌측 로고, 우측 메뉴를 양 끝 정렬(`justify-content: space-between`)할 때 가장 효율적입니다.
* **Grid 적용 (`Projects` 카드 섹션, `Skills` 섹션)**:
  * **이유**: 2차원(행과 열) 레이아웃 구성에 적합합니다. `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));` 구문을 사용하여 자바스크립트나 미디어 쿼리 없이도 화면 크기에 맞게 카드 개수가 유연하게 조절되도록 구현했습니다.

---

### 🧠 [평가항목 4] 심화 & 디자인 철학

#### Q1. 상태(`state`) 객체를 따로 만들어 관리한 이유는 무엇인가요? (일반 변수와 비교)
* **단일 출처(Single Source of Truth)**: 앱의 주요 상태값(`theme`, `projects`, `isLoading`, `error`, `filter`)을 하나의 `state` 객체로 결합하여 관리했습니다.
* **일반 변수와의 비교**: 
  * 여러 개의 단일 `let` 변수를 흩뿌려 선언하면 스코프 오염이 발생하고 어떤 이벤트가 어떤 변수를 수정했는지 추적하기 어렵습니다.
  * `state` 객체로 집중 관리하면 **"현재 앱의 상태"가 명확히 시각화**되며, React와 같은 현대 프론트엔드 프레임워크의 State 기반 단방향 렌더링 원리를 이해하는 기초가 됩니다.

#### Q2. 반응형 디자인에서 "모바일 퍼스트(Mobile-First)" 접근 방식을 사용한 이유는 무엇인가요?
* **성능 및 사용자 경험 우선**: 모바일 화면은 제약 요소(작은 스크린, 느린 네트워크 환경 등)가 많으므로, 핵심 콘텐츠와 가장 경량화된 레이아웃을 먼저 작성합니다.
* **점진적 향상(Progressive Enhancement)**: 모바일 기준 기본 CSS에 `@media (min-width: 768px)`처럼 큰 화면에 필요한 스타일을 덧붙여 나가는 방식이, 데스크톱용 복잡한 코드를 모바일에서 불필요하게 덮어쓰거나 오버라이드하는 것보다 **코드 양이 줄어들고 유지보수에 훨씬 유리**하기 때문입니다.

---

## 🛠️ 실행 방법
1. 저장소 클론 (or Zip 다운로드)
   ```bash
   git clone [https://github.com/](https://github.com/)<username>/<repository-name>.git
   ```
2. VS Code에서 폴더를 연 후, `index.html` 파일을 **Live Server** 확장 프로그램을 사용하여 실행합니다.




---

1.에러 상태 확인 (실패 화면): API 요청이 실패하는 상황을 가상으로 만들어봅니다.

VS Code에서 js/main.js 파일을 엽니다.상단의 const GITHUB_USERNAME = 'octocat'; 부분을 존재할 수 없는 아이디(예: const GITHUB_USERNAME = 'wrong_id_test_999';)로 임시 수정하고 저장(Ctrl+S)합니다.

검증 방법: Projects 구역에 "프로젝트를 불러올 수 없습니다"라는 안내문과 [다시 시도] 버튼이 빨간색/경고 문구로 뜨면 성공입니다. (확인 후 다시 원래 아이디로 수정)

2.빈 상태 확인 (프로젝트 없음): 불러온 프로젝트가 0개인 상황을 테스트합니다.js/main.js 파일에서 const GITHUB_USERNAME에 새로 만든 계정이거나 저장소가 전혀 없는 깃허브 아이디를 입력해봅니다.

검증 방법: Projects 구역에 "표시할 프로젝트가 없습니다"라는 안내 메시지가 깔끔하게 나타나면 성공입니다.
