import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import StickyHeader from './modules/StickyHeader'

let mobileMenu = new MobileMenu();
let stickyHeader = new StickyHeader();
let modal


document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
        if(typeof modal == "undefined") {
            import('./modules/Modal').then(x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log("Error"))
        } else {
            modal.openTheModal()
        }
    })
})


if(module.hot) {
    module.hot.accept()
}