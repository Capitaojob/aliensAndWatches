export const playAudio = (audioFile) => {
    let audio = new Audio(audioFile)
    audio.play()
}

export const randomTurnAudio = () => {
    let audio = new Audio(Math.random() > 0.5 ? "./assets/sounds/left_turn.ogg" : "./assets/sounds/right_turn.ogg")
    audio.play()
}
