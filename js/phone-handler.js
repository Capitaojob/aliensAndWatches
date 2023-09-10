import { changeAndShowPlaylist, omnitrixDisplay, turnOmnitrix } from "./omnitrix.js"

omnitrixDisplay.addEventListener("touchstart", handleTouchStart)
omnitrixDisplay.addEventListener("touchmove", (e) => {
    e.preventDefault()
    handleTouchMove(e)
})

var xDown = null
var yDown = null
var turning = false

function getTouches(e) {
    return e.touches || e.originalEvent.touches
}

export function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
}

export function handleTouchMove(e) {
    if (turning || !omnitrixDisplay.classList.contains("up")) {
        return // Early return if not allowed to turn or not in "up" state
    }

    if (!xDown || !yDown) {
        return // Early return if touchstart data is missing
    }

    const xUp = e.touches[0].clientX
    const yUp = e.touches[0].clientY

    const xDiff = xDown - xUp
    const yDiff = yDown - yUp

    // Preventing movement
    turning = true
    setTimeout(() => {
        turning = false
    }, 500)

    let direction

    if (Math.abs(yDiff) < Math.abs(xDiff)) {
        direction = xDiff > 0 ? "left" : "right"
        turnOmnitrix(direction)
    } else {
        direction = yDiff > 0 ? "forwards" : "backwards"
        changeAndShowPlaylist(direction)
    }

    xDown = e.touches[0].clientX
    yDown = e.touches[0].clientY
}
