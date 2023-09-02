import { turnOmnitrix } from "./omnitrix.js"

// document.addEventListener("touchstart", handleTouchStart, false)
// document.addEventListener("touchmove", handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(e) {
    return (
        e.touches || // browser API
        e.originalEvent.touches
    ) // jQuery
}

export function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
}

export function handleTouchMove(e) {
    if (!xDown || !yDown) {
        return
    }

    var xUp = e.touches[0].clientX
    var yUp = e.touches[0].clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (yDiff < xDiff) turnOmnitrix(xDiff > 0 ? "right" : "left")

    /* reset values */
    xDown = null
    yDown = null
}
