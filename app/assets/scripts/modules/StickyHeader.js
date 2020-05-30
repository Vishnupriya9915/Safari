import throttle from 'lodash/throttle'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.previousScrollY = window.scrollY
        this.events()
    }

    events() {
        window.addEventListener("scroll",throttle(() => this.runOnScroll(), 200))
    }

    runOnScroll() {
        this.determineScrollDirection()

        if(window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark")
        }
        else {
            this.siteHeader.classList.remove("site-header--dark")
        }

        this.pageSections.forEach(ele => this.calcSection(ele));
    }

    determineScrollDirection() {
        if(window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'
        }
        else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY
    }

    calcSection(ele) {
        if(window.scrollY + window.innerHeight > ele.offsetTop && window.scrollY < ele.offsetTop + ele.offsetHeight) {
            let scrollPercent = ele.getBoundingClientRect().y / window.innerHeight * 100
            if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
                let matchingLink = ele.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(ele => ele.classList.remove("is-current-link"))
                document.querySelector(matchingLink).classList.add("is-current-link")
            }
        }
    }
}

export default StickyHeader;