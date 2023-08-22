const getTop = () => window.scrollY || document.documentElement.scrollTop

const onPageScroll = () => {

    const offset = 100
    const scrollUp = document.querySelector('.scroll-up')
    const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path')

    if (scrollUp) {
        const pathLength = scrollUpSvgPath.getTotalLength()
        scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`
        scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms'

        const height = document.documentElement.scrollHeight - window.innerHeight
        const dashOffset = pathLength - (getTop() * pathLength / height)
        scrollUpSvgPath.style.strokeDashoffset = dashOffset

        if (getTop() > offset) {
            scrollUp.classList.add('scroll-up--active')
        } else {
            scrollUp.classList.remove('scroll-up--active')
        }
    }
}

export default onPageScroll