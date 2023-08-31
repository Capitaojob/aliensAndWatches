import { playlistMatrix } from "./aliens.js"

const omnitrixBtn = document.querySelector("#omnitrix .green-btn")
const omnitrixDisplay = document.querySelector("#omnitrix .mid-portion .frame")
const lights = document.querySelector("#omnitrix .lights")
const alienName = document.querySelector("#alienName")

let currentPlaylist = 0
let currentAlienId = 0

omnitrixBtn.addEventListener("click", () => {
    if (omnitrixDisplay.classList.contains("active")) {
        toggleOmnitrixDisplay()
        playAudio("../sounds/beep.ogg")
    }
})

omnitrixBtn.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    changePlaylist()
    playAudio("../sounds/beep.ogg")
})

omnitrixDisplay.addEventListener("click", () => {
    if (isOmnitrixDisplayUp()) {
        // Transform
        toggleOmnitrixDisplay()
        playAudio("./sounds/transformation_1.ogg")
        omnitrixDisplay.classList.remove("active")
    } else if (
        !omnitrixDisplay.classList.contains("active") &&
        !omnitrixDisplay.classList.contains("inactive")
    ) {
        // Detransform and deactivate
        playAudio("./sounds/end.ogg")
        omnitrixTimeOut()
        alienName.innerText = ""
    } else if (omnitrixDisplay.classList.contains("inactive")) {
        // Reactivate
        playAudio("./sounds/initiate.ogg")
        omnitrixDisplay.classList.remove("inactive")
        omnitrixDisplay.classList.add("active")
    }
})

omnitrixDisplay.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    // if (omnitrixDisplay.classList.contains("up") && omnitrixDisplay.style.animation == "") {
    if (
        omnitrixDisplay.classList.contains("up") &&
        !(
            omnitrixDisplay.classList.contains("rotate-right") ||
            omnitrixDisplay.classList.contains("rotate-left")
        )
    ) {
        let isRight = e.clientX >= window.innerWidth / 2
        isRight ? turnOmnitrix("right") : turnOmnitrix("left")
    }
})

const isOmnitrixDisplayUp = () => {
    if (omnitrixDisplay.classList.contains("up")) {
        return true
    }
    return false
}

const toggleOmnitrixDisplay = () => {
    if (!omnitrixDisplay.classList.contains("up")) {
        omnitrixDisplay.style.transform = "scale(1.1)"
        playAudio("./sounds/alien_choose_initiate.ogg")
        showAlienName()
    } else {
        omnitrixDisplay.style.transform = "scale(1)"
    }
    omnitrixDisplay.classList.toggle("up")
}

const turnOmnitrix = (direction) => {
    randomTurnAudio()
    // omnitrixDisplay.style.animation = (direction == "right" ? "rotateDisplay" : "rotateDisplayBack") + " 1s ease-in-out "
    let rotation = direction == "right" ? "rotate-right" : "rotate-left"

    changeAlien(direction)

    showAlienName()

    omnitrixDisplay.classList.add(rotation)
    setTimeout(() => {
        omnitrixDisplay.classList.remove(rotation)
    }, 1000)
}

const omnitrixTimeOut = () => {
    let isTimingOut = true

    omnitrixDisplay.classList.toggle("inactive")

    setInterval(() => {
        if (!isTimingOut) {
            return
        }
        omnitrixDisplay.classList.toggle("inactive")
    }, 500)

    setTimeout(() => {
        isTimingOut = false
        omnitrixDisplay.classList.add("inactive")
    }, 3000)
}

const playAudio = (audioFile) => {
    let audio = new Audio(audioFile)
    audio.play()
}

const randomTurnAudio = () => {
    let audio = new Audio(
        Math.random() > 0.5
            ? "./sounds/left_turn.ogg"
            : "./sounds/right_turn.ogg"
    )
    audio.play()
}

const showAlienName = () => {
    alienName.innerText = playlistMatrix[currentPlaylist][currentAlienId]
}

const changePlaylist = () => {
    if (currentPlaylist < playlistMatrix.length - 1) {
        currentPlaylist++
    } else {
        currentPlaylist = 0
    }
}

const changeAlien = (direction) => {
    if (direction == "right") {
        if (currentAlienId < 9) {
            currentAlienId++
        } else {
            currentAlienId = 0
        }
    } else {
        if (currentAlienId > 0) {
            currentAlienId--
        } else {
            currentAlienId = 9
        }
    }

    showAlienName()
}
