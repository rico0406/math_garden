var aswer;
var score = 0;
var backgroundImage = []

function nextQuestion() {
    n1 = Math.floor(Math.random() * 5);
    document.getElementById('n1').innerHTML = n1;

    n2 = Math.floor(Math.random() * 6);
    document.getElementById('n2').innerHTML = n2;

    aswer = n1 + n2;
}

function checkAswer() {
    const prediction = predictImage();

    if (prediction==aswer) {
        score++;
        if (score==7) {
            // alert('Parabéns, o jardim da matemática está a salvo graças a você, Floribela!')
            alert('Congratulations!\n Thanks to you, Sun Shine, the Math Garden is safe! =D\nWell Done!')
            score = 0;
            backgroundImage = []
        }else{
            backgroundImage.push(`url('images/background${score}.svg')`);
        }
        
        document.body.style.backgroundImage = backgroundImage;
        
    } else if (score>0) {
        score--;
        // alert(`Você errou! =(\n  Sua resposta foi ${prediction}, mas a resposta correta era ${aswer}. Tente de novo!`)
        alert(`Sorry, you are wrong! =(\n  You aswred ${prediction} instead of ${aswer}. Try again!`)
        setTimeout(function () {
            backgroundImage.pop();
            document.body.style.backgroundImage = backgroundImage;
        }, 1000);
    }
    console.log(score);
}