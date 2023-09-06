import { omnitrixDisplay, turnOmnitrix } from "./omnitrix.js"

document.addEventListener("touchstart", handleTouchStart, false)
document.addEventListener("touchmove", handleTouchMove, false)

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

    if (Math.abs(yDiff) < Math.abs(xDiff)) {
        turning = true
        const direction = xDiff > 0 ? "left" : "right"
        turnOmnitrix(direction)
        setTimeout(() => {
            turning = false
        }, 500)
    }

    xDown = event.touches[0].clientX
    yDown = event.touches[0].clientY
}

// export function handleTouchMove(e) {
//     if (turning != true && omnitrixDisplay.classList.contains("up")) {
//         if (!xDown || !yDown) {
//             return
//         }

//         var xUp = e.touches[0].clientX
//         var yUp = e.touches[0].clientY

//         var xDiff = xDown - xUp
//         var yDiff = yDown - yUp

//         if (Math.abs(yDiff) < Math.abs(xDiff)) {
//             turning = true
//             turnOmnitrix(xDiff > 0 ? "left" : "right")
//             setTimeout(() => {
//                 turning = false
//             }, 500)
//         }

//         xDown = e.touches[0].clientX
//         yDown = e.touches[0].clientY
//     }
// }
