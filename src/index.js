import './blocks/style.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
import Inputmask from "inputmask";
//маска телефона
const telMask = document.querySelector('#tel')
Inputmask({ "mask": "+7 (999) 999-99-99" }).mask(telMask);


//текст с эффектом появления

const upperText = [
    'Создание лендингов,\n',
    'Посадочных страниц,\n',
    'JavaScript'
]

function typeText() {
    let line = 0;
    let count = 0;
    let outText = '';
    let htmlOut = document.querySelector('.uppertext__text')

    function typeLine() {
        setTimeout(() => {
            outText += upperText[line][count]
            htmlOut.innerHTML = outText + '|';
            count++;
            if (count >= upperText[line].length) {
                count = 0;
                line++;
                if (line == upperText.length) {

                    line = 0;
                    count = 0;
                    outText = '';


                }
            }
            typeLine()
        }, 200)
    }

    typeLine()
}
typeText()
    //бургер меню
const burgerBttn = document.querySelector('.burger');
const navMenu = document.querySelector('.header__menu-list')

function toggleMenu() {
    navMenu.classList.toggle('active')
    burgerBttn.classList.toggle('bttn-active')

}

burgerBttn.addEventListener('click', toggleMenu)


const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 600,
    framesCount = 50;

//плавная прокрутка
anchors.forEach(function(item) {

    item.addEventListener('click', function(e) {
        e.preventDefault();
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - 150;
        let scroller = setInterval(function() {
            let scrollBy = coordY / framesCount;
            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                window.scrollBy(0, scrollBy);
            } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
        }, animationTime / framesCount);
    });
});

//анимация
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 1, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

//Валидация

const form = document.forms.contacts
const submit = document.querySelector('.submit')
const inputs = document.querySelectorAll('input')

form.addEventListener('submit', (evt) => {

    evt.preventDefault()
    const inputName = form.querySelector('#name')
    const inputTel = form.querySelector('#tel')
    const inputMail = form.querySelector('#mail')
    if (inputName.value.trim().length !== 0 && inputTel.value.trim().length !== 0 && !inputMail.validity.typeMismatch) {
        submit.removeAttribute('disabled', 'disabled')
    }

    if (inputName.value.trim().length === 0) {
        inputName.style = "border:1px solid red"
        inputName.nextElementSibling.textContent = 'Это обязательное поле'
        submit.setAttribute('disabled', true)

    }
    if (inputTel.value.trim().length === 0) {
        inputTel.style = "border:1px solid red"
        inputTel.nextElementSibling.textContent = 'Это обязательное поле'
        submit.setAttribute('disabled', true)

    }
    if (inputMail.value.trim().length === 0) {
        inputMail.style = "border:1px solid red"
        inputMail.nextElementSibling.textContent = 'Это обязательное поле'
        submit.setAttribute('disabled', true)

    }
    const formData = new FormData(form);
    fetch('mail.php', {
            method: "POST",
            body: formData
        })
        .then((data) => {
            console.log(data)
            console.log('отправлено')
        })
        .then(() => {
            inputs.forEach((elt) => {
                elt.value = ' '
            })
        })

})

inputs.forEach((elt) => {
    elt.addEventListener('keydown', () => {
        submit.removeAttribute('disabled', 'disabled')
        elt.style = "border:1px solid rgb(66, 212, 90)"
        elt.nextElementSibling.textContent = ''
    })
})