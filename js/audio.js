export const playAudio = (audioFile) => {
    let audio = new Audio(audioFile)
    audio.play()
}

export const randomTurnAudio = () => {
    let audio = new Audio(Math.random() > 0.5 ? "./sounds/left_turn.ogg" : "./sounds/right_turn.ogg")
    audio.play()
}
