let F = 100;
let mu =  4*Math.PI*Math.pow(10,-7);
let R = 100;
let frec = 50;
let w = Math.PI*2*frec;

/*
let veberText = document.getElementById("veberID");
let veberSlider = document.getElementById("veberValue");
let frecText = document.getElementById("antiPeriodID");
let frecSlider = document.getElementById("antiPeriodValue");
let R0Text = document.getElementById("omID");
let R0Slider = document.getElementById("omValue");
*/

const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );


let veber_text = document.getElementById("veber_id");
let om_text = document.getElementById("om_id");
let frec_text = document.getElementById("frec_id");
let resultButton = document.getElementById('result');

showMessage(F,R,frec);

/*

veberSlider.addEventListener("input", function(e){
    F = Number(veberSlider.value);
    veberText.innerHTML = "Величина магнитного поля(Вб): " + F;
    showMessage(F,R,frec);
});


frecSlider.addEventListener("input", function(e){
    frec = Number(frecSlider.value);
    console.log("frec", frec );
    w = Math.PI*2*frec;
    frecText.innerHTML = "Частота вращения(с<sup>-1</sup>): " + frec;
    showMessage(F,R,frec);
});



R0Slider.addEventListener("input", function(e){
    R = Number(R0Slider.value);
    R0Text.innerHTML = "Сопротивление контура(Ом): " + R;
    showMessage(F,R,frec);
});

*/

function showMessage(F,R,frec) {
    let massx = [];
    let massy = [];
    let massy2 = [];
    w = Math.PI*2*frec;
    let i =0 ;
    
    while (frec!=0 && frec*i<1  ){
        massx.push(i);
        let e = F*w*Math.sin(w*i);
        let I =  e/R;
        massy.push(e);
        massy2.push(I);
        i+=0.00001;
    }

    var result ={
        x: massx,
        y: massy,
        mode:'lines', line: {color: "#04BBEC"}
    };
    var result2 ={
        x: massx,
        y: massy2,
        mode: 'lines', line: {color: "#FF82F4"}
    };
    var baseLayout = {
        title: 'Зависимость ЭДС от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'ЭДС,В',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    var baseLayout2 = {
        title: 'Зависимость индукционного тока от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'I,А',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    Plotly.react( 'tester', [result], baseLayout );
    Plotly.react( 'tester2', [result2], baseLayout2 );
}


resultButton.onclick = function(){
    F = veber_text.value;
    R = om_text.value;
    frec = frec_text.value;
    console.log("Ширина", availableScreenWidth );
    if (F < 0 || R<0 || frec < 0){
        alert("Значения не могут быть отрицательными!")
    }
    else{
        showMessage(F,R,frec);
    }

    
}