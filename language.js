var language = 'EN'

function changeLanguage() {
    if (language == 'EN') {
        language = 'PT'
        document.getElementById('title').innerHTML = "Jardim Matemático"
        document.getElementById('language').innerHTML = "EN"
        document.getElementById('checkAnswer').innerHTML = "Corrigir"

        finishMessage = 'Parabéns, o jardim da matemática está a salvo graças a você, Floribela!'
        mistakeMessage = ['Você errou! =(\n  Sua resposta foi', 'mas a resposta correta era ', '. Tente de novo!']

    } else {
        language = 'EN'
        document.getElementById('title').innerHTML = "Math Garden"
        document.getElementById('language').innerHTML = "PT"
        document.getElementById('checkAnswer').innerHTML = "Check Answer"

        finishMessage = 'Congratulations!\n Thanks to you, Sun Shine, the Math Garden is safe! =D\nWell Done!'
        mistakeMessage = ['Sorry, you are wrong! =(\n  You aswred', 'instead of', '. Try again!']

    }
}