const lines = document.querySelectorAll('.menu-acco__line');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

for (let index = 0; index < lines.length; index++) {
  const element = lines[index]
  element.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.classList.contains('menu-acco__content')) return
    
    const currentLine = e.target.closest('.menu-acco__line');
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] !== currentLine)
      lines[i].classList.remove('menu-acco__line_active')
    } 
    
    if (currentLine.classList.contains('menu-acco__line_active')) {
      currentLine.classList.remove('menu-acco__line_active')
    } else {
      currentLine.classList.add('menu-acco__line_active')
    } 
  })
}

/*здесь начинаем реализовывать one-page-scroll */
const sections = $('.section');
const display = $('.wrapper__content');
const sideMenu = $('.fixed-menu');

let inScroll = false;

sections.first().addClass('active');

const countSectionPosition = sectionEq => {
    return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr('data-sidemmenu-theme');
    const activeClass = 'fixed-menu--shadowed';
    
    if (menuTheme === 'black') {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
}

const performTransition = sectionEq => {
    if (inScroll === false) {
        inScroll = true;
        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`,
        });
    
        sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

        sideMenu.find('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item--active').siblings().removeClass('fixed-menu__item--active');

        setTimeout(() => {
            inScroll = false;
        }, 360);
    }
};

const scrollViewport = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'next' && nextSection.length) {
        performTransition(nextSection.index());
    }
    if (direction === 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }
};

$(window).on('wheel', (e) => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport('next');
    };

    if (deltaY < 0) {
        scrollViewport('prev');
    };
});

$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !== 'input' && tagName !== 'textarea') {
        switch (e.keyCode) {
            case 38:
                scrollViewport('prev');
                break;
            case 40:
                scrollViewport('next');
                break;
        };
    }
});

$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
});

/*jquery touch swipe*/
if (isMobile) {
    $(".wrapper__content").swipe({
        swipe: function (event, direction) {
            const scroller = scrollViewport();
            let scrollDirection = "";

            if (direction === "up") scrollDirection = "next";
            if (direction === "down") scrollDirection = "prev";

            scrollViewport(scrollDirection);
        },
    });
}