// GitHub 사용자 ID 설정 (본인 ID로 변경 가능)
const GITHUB_USERNAME = 'syj399777-coder';

// 전역 상태 객체 (상태 관리 패턴)
const state = {
    theme: localStorage.getItem('theme') || 'light',
    projects: [],
    filter: 'all',
    isLoading: false,
    error: null
};

// DOM 요소 캐싱
const elements = {
    html: document.documentElement,
    header: document.getElementById('header'),
    themeToggle: document.getElementById('theme-toggle'),
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('nav-menu'),
    scrollTopBtn: document.getElementById('scroll-top-btn'),
    projectsContainer: document.getElementById('projects-container'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    contactForm: document.getElementById('contact-form'),
    formSuccessMsg: document.getElementById('form-success-msg')
};

/* ==========================================
   1. 다크 모드 (LocalStorage 상태 유지)
   ========================================== */
const initTheme = () => {
    // 시스템 모드 감지 (보너스 구현)
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.theme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(state.theme);
};

const applyTheme = (theme) => {
    elements.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = elements.themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
};

elements.themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(state.theme);
});

/* ==========================================
   2. 모바일 햄버거 메뉴 토글
   ========================================== */
elements.hamburger.addEventListener('click', () => {
    elements.navMenu.classList.toggle('active');
});

// 메뉴 링크 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        elements.navMenu.classList.remove('active');
    });
});

/* ==========================================
   3. 스크롤 이벤트 (네비게이션 배경 & 스크롤 탑 버튼)
   ========================================== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // 스크롤 60px 이상 시 헤더 스타일 변경
    if (scrollY > 60) {
        elements.header.classList.add('scrolled');
    } else {
        elements.header.classList.remove('scrolled');
    }

    // 스크롤 300px 이상 시 스크롤 탑 버튼 노출
    if (scrollY > 300) {
        elements.scrollTopBtn.classList.add('visible');
    } else {
        elements.scrollTopBtn.classList.remove('visible');
    }
});

elements.scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==========================================
   4. 스크롤 애니메이션 (Intersection Observer)
   ========================================== */
const observerOptions = {
    root: null,
    threshold: 0.2 // 임계값 0.2 적용
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target); // 한 번 등장 후 관찰 해제
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ==========================================
   5. GitHub API 연동 (비동기 처리 & 상태 UI)
   ========================================== */
const fetchGitHubRepos = async () => {
    state.isLoading = true;
    state.error = null;
    renderProjectsState();

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        // 403 Rate Limit 및 기타 에러 대응
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('API 요청 제한을 초과했습니다 (Rate Limit). 잠시 후 다시 시도해 주세요.');
            }
            throw new Error('프로젝트를 불러올 수 없습니다.');
        }

        const data = await response.json();
        state.projects = data;
        state.isLoading = false;
        renderProjects();
    } catch (err) {
        state.isLoading = false;
        state.error = err.message;
        renderProjectsState();
    }
};

// UI 상태 렌더링 (로딩 / 에러 / 빈 상태)
const renderProjectsState = () => {
    if (state.isLoading) {
        elements.projectsContainer.innerHTML = `
            <div class="state-box">
                <div class="spinner"></div>
                <p>GitHub에서 프로젝트를 불러오는 중입니다...</p>
            </div>
        `;
        return;
    }

    if (state.error) {
        elements.projectsContainer.innerHTML = `
            <div class="state-box">
                <p style="color: var(--error-color); margin-bottom: 15px;">${state.error}</p>
                <button id="retry-btn" class="btn btn-primary">다시 시도</button>
            </div>
        `;
        document.getElementById('retry-btn')?.addEventListener('click', fetchGitHubRepos);
        return;
    }
};

// 성공 상태 프로젝트 목록 카드 렌더링
const renderProjects = () => {
    // 필터링 적용 (array.filter)
    const filteredRepos = state.projects.filter(repo => {
        if (state.filter === 'all') return true;
        return repo.language === state.filter;
    });

    // 빈 상태 처리
    if (filteredRepos.length === 0) {
        elements.projectsContainer.innerHTML = `
            <div class="state-box">
                <p>표시할 프로젝트가 없습니다.</p>
            </div>
        `;
        return;
    }

    // array.map 및 템플릿 리터럴로 동적 카드 생성
    elements.projectsContainer.innerHTML = filteredRepos.map(repo => {
        const { name, description, html_url, stargazers_count, language } = repo;
        return `
            <article class="project-card">
                <div>
                    <h3 class="project-title">${name}</h3>
                    <p class="project-desc">${description || '설명이 작성되지 않은 프로젝트입니다.'}</p>
                </div>
                <div class="project-meta">
                    <span><i class="fa-solid fa-code"></i> ${language || '기타'}</span>
                    <span><i class="fa-solid fa-star"></i> ${stargazers_count}</span>
                    <a href="${html_url}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color);">Link →</a>
                </div>
            </article>
        `;
    }).join('');
};

// 프로젝트 필터 버튼 이벤트 처리
elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        elements.filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.filter = e.target.dataset.filter;
        renderProjects();
    });
});

/* ==========================================
   6. Contact 폼 유효성 검사 (Form UX)
   ========================================== */
elements.contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    // 입력 필드 추출 (구조분해 할당 사용)
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('user-message');

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    // 에러 메세지 초기화
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';
    elements.formSuccessMsg.textContent = '';

    let isValid = true;

    // 1. 이름 필수값 검증
    if (!nameVal) {
        document.getElementById('name-error').textContent = '이름을 입력해주세요.';
        isValid = false;
    }

    // 2. 이메일 정규식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
        document.getElementById('email-error').textContent = '이메일을 입력해주세요.';
        isValid = false;
    } else if (!emailRegex.test(emailVal)) {
        document.getElementById('email-error').textContent = '올바른 이메일 형식이 아닙니다.';
        isValid = false;
    }

    // 3. 메시지 필수값 검증
    if (!messageVal) {
        document.getElementById('message-error').textContent = '메시지를 입력해주세요.';
        isValid = false;
    }

    // 성공 처리
    if (isValid) {
        elements.formSuccessMsg.textContent = '메시지가 성공적으로 전송되었습니다!';
        elements.contactForm.reset();
    }
});

/* ==========================================
   7. 초기화 실행
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    fetchGitHubRepos();
});