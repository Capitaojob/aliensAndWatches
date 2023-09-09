import { changeAndShowPlaylist, omnitrixDisplay, turnOmnitrix } from "./omnitrix.js"

omnitrixDisplay.addEventListener("touchstart", handleTouchStart, false)
omnitrixDisplay.addEventListener("touchmove", handleTouchMove, false)

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

export function handleTouchMove(event) {
    if (turning || !omnitrixDisplay.classList.contains("up")) {
        return // Early return if not allowed to turn or not in "up" state
    }

    if (!xDown || !yDown) {
        return // Early return if touchstart data is missing
    }

    const xUp = event.touches[0].clientX
    const yUp = event.touches[0].clientY

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

    xDown = event.touches[0].clientX
    yDown = event.touches[0].clientY
}
