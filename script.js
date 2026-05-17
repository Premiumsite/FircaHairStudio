const header = document.getElementById("header")
const snow = document.getElementById("snow")

let lastScroll = 0
window.addEventListener("scroll", () => {
  const y = window.scrollY
  if (y > lastScroll && y > 120) header.classList.add("hide")
  else header.classList.remove("hide")
  lastScroll = y
}, { passive: true })

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    entry.target.classList.add("show")
    io.unobserve(entry.target)
  })
}, { threshold: .14 })

document.querySelectorAll(".reveal").forEach(el => io.observe(el))

function makeSnow(){
  const mobile = innerWidth < 768
  const count = mobile ? 30 : 58
  snow.innerHTML = ""

  for(let i = 0; i < count; i++){
    const s = document.createElement("span")
    const size = Math.random() * 2.5 + 1
    s.style.width = size + "px"
    s.style.height = size + "px"
    s.style.left = Math.random() * 100 + "%"
    s.style.animationDuration = (Math.random() * 8 + 10) + "s"
    s.style.animationDelay = (Math.random() * -14) + "s"
    s.style.setProperty("--drift", (Math.random() * 58 - 29) + "px")
    snow.appendChild(s)
  }
}

makeSnow()


const counters = document.querySelectorAll(".counter")

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return

    const el = entry.target
    const target = Number(el.dataset.target)
    let current = 0
    const step = Math.max(1, Math.ceil(target / 46))

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        el.textContent = target
        clearInterval(timer)
      } else {
        el.textContent = current
      }
    }, 22)

    counterObserver.unobserve(el)
  })
}, { threshold: .55 })

counters.forEach((counter) => counterObserver.observe(counter))
