let veberText = document.getElementById("veberID");
let veberSlider = document.getElementById("veberValue");
let F = 100;
let mu =  4*Math.PI*Math.pow(10,-7);
let R = 100;
let frec = 50;
let w = Math.PI*2*frec;


let frecText = document.getElementById("antiPeriodID");
let frecSlider = document.getElementById("antiPeriodValue");
let R0Text = document.getElementById("omID");
let R0Slider = document.getElementById("omValue");

const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );

showMessage(F,w,R);

veberSlider.addEventListener("input", function(e){
    F = Number(veberSlider.value);
    veberText.innerHTML = "Величина магнитного поля(Вб): " + F;
    showMessage(F,w,R);
});


frecSlider.addEventListener("input", function(e){
    frec = Number(frecSlider.value);
    w = Math.PI*2*frec;
    frecText.innerHTML = "Частота вращения(с<sup>-1</sup>): " + frec;
    showMessage(F,w,R);
});



R0Slider.addEventListener("input", function(e){
    R = Number(R0Slider.value);
    R0Text.innerHTML = "Сопротивление контура(Ом): " + R;
    showMessage(F,w,R);
});


function showMessage(F,w,R) {
    let massx = [];
    let massy = [];
    let massy2 = [];
    for (let i =0; i<100; i +=1 ){
        massx.push(i);
        let e = F*w*Math.sin(w*i);
        let I =  e/R;
        massy.push(e);
        massy2.push(I);
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
            title: 'сек',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'В',
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
            title: 'сек',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'А',
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