export default {
  mounted(el, binding) {
    const animation = binding.value?.animation || 'fade-up'
    const delay = binding.value?.delay || 0

    el.classList.add('app-reveal')
    el.classList.add(`app-reveal-${animation}`)

    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('app-reveal-visible')
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(el)

    el.__revealObserver = observer
  },

  unmounted(el) {
    if (el.__revealObserver) {
      el.__revealObserver.disconnect()
    }
  },
}