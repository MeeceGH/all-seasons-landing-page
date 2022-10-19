const nav = document.querySelector('nav');
const navBars = document.querySelector('.nav-icon .fa-bars');
const navExpand = document.querySelectorAll('.nav-dropdown .nav-btn-expand');
const navCollapse = document.querySelectorAll('.nav-dropdown .collapse');
const navDropdown = document.querySelector('.nav-dropdown ul');
const banner = document.getElementById('banner');
const bannerCircles = document.querySelectorAll('#banner .circle-container .circle');
const bannerBoxes = document.querySelectorAll('#banner .banner-box-container .banner-box');
const testimonyBoxes = document.querySelectorAll('#testimonials .testimony-box-container .testimony-box');
const testimonyCircles = document.querySelectorAll('#testimonials .circle-container .circle');

let bannerHovered = false;

let bannerIdx = 0;
let testimonyIdx = 0;

let bannerInterval;
let testimonyInterval;

navExpand.forEach(el => {
    el.addEventListener('click', () => {
        el.nextElementSibling.classList.add('show');
    });
});

navCollapse.forEach((el, idx) => {
    el.addEventListener('click', () => {
        navExpand[idx].nextElementSibling.classList.remove('show');
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1064) {
        nav.classList.remove('show');
        navExpand.forEach(el => {
            el.nextElementSibling.classList.remove('show');
        });
    };
});

window.addEventListener('click', (e) => {
    if (nav.classList.contains('show') && !e.target.closest('.nav') && !e.target.closest('.fa-bars')) {
        nav.classList.remove('show');
    };
});

banner.addEventListener('mouseover', () => {
    bannerHovered = true;
});

banner.addEventListener('mouseleave', () => {
    bannerHovered = false;
});

navBars.addEventListener('click', () => {
    nav.classList.add('show');
});

bannerCircles.forEach((circle, idx) => {
    circle.addEventListener('click', () => {
        bannerIdx = idx;
        updateBannerCircles();
        clearInterval(bannerInterval);
        createBannerInterval();
        setBannerBox();
    });
});

testimonyCircles.forEach((circle, idx) => {
    circle.addEventListener('click', () => {
        testimonyIdx = idx;
        updateTestimonyCircles();
        clearInterval(testimonyInterval);
        createTestimonyInterval();
        setTestimonyBox();
    })
})

function updateBannerCircles() {
    bannerCircles.forEach(circle => {
        circle.classList.remove('active-circle');
        bannerCircles[bannerIdx].classList.add('active-circle');
    });
}

function setBannerBox() {
    bannerBoxes.forEach((box, idx) => {
        box.style.transform = `translateX(${(idx * 100) - (bannerIdx * 100)}%)`;
    });
}

function createBannerInterval() {
    bannerInterval = setInterval(() => {
        bannerIdx += 1;
        if (bannerIdx > bannerBoxes.length - 1) {
            bannerIdx = 0;
        };
        updateBannerCircles();
        setBannerBox();
    }, 5000);
}

function setTestimonyBox() {
    testimonyBoxes.forEach(box => {
        box.classList.remove('active-box');
    });
    testimonyBoxes[testimonyIdx].classList.add('active-box');
}

function updateTestimonyCircles() {
    testimonyCircles.forEach(circle => {
        circle.classList.remove('active-circle');
        testimonyCircles[testimonyIdx].classList.add('active-circle');
    });
}

function createTestimonyInterval() {
    testimonyInterval = setInterval(() => {
        testimonyIdx += 1;
        if (testimonyIdx > testimonyBoxes.length - 1) {
            testimonyIdx = 0;
        };
        updateTestimonyCircles();
        setTestimonyBox();
    }, 5000);
}

createBannerInterval();
createTestimonyInterval();