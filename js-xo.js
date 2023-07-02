
let turn ='X';
let game_over = false; 
let count=0;
let click_audio =  new Audio("Click_Sound.mp3");
let start_sound = new Audio("game_start_sound.wav");
let game_win = new Audio("game_win.wav");


$(document).ready(function(){
    $("#start").click(function(){
        $(".container").fadeToggle(1000);
        $(".container").css("display" , "flex");
        $(this).css("display" , "none");
        click_audio.play();
        start_sound.play();
    });
});


const changeTurn = () => {
    return turn=='X' ? 'O' : 'X';
}

function checkWin(){

    let boxtext = document.getElementsByClassName("boxtext");
    // console.log(boxtext);

    let winCom = [
        [0 , 1 , 2 , -1.25 , 4.9 , 0],
        [3 , 4 , 5 , -1.25 , 14.9 , 0],
        [6 , 7 , 8 , -1.25 , 24.9 , 0],
        [0 , 3 , 6 , 14.8 , 11.3 , 90],
        [1 , 4 , 7 , 14.8 , 1.2 , 90],
        [2 , 5 , 8 , 14.8 , -8.9 , 90],
        [0 , 4 , 8 , 9.3 , 11.3 , 45],
        [2 , 4 , 6 , 11.4 , -9.7 , 135]
    ]

    winCom.forEach(function (winLine){
        
        // console.log(winLine[0]);

        if((boxtext[winLine[0]].innerText==boxtext[winLine[1]].innerText) && (boxtext[winLine[1]].innerText==boxtext[winLine[2]].innerText) && boxtext[winLine[0]].innerText!=''){

            document.querySelector(".info").innerText ="";

            document.querySelector("#win-text").innerText = "Winner: Player " + boxtext[winLine[0]].innerText;

            boxtext[winLine[0]].style.color="#317773";
            boxtext[winLine[1]].style.color="#317773";
            boxtext[winLine[2]].style.color="#317773";

            document.querySelector(".line").style.width="32.5vw";
            document.querySelector(".line").style.height="3px";


            // the order of rotate and translate is important in this we take rotate first and then translate
            //if we take translate first then it will not work properly and we have to change the values of translate accordingly
            document.querySelector(".line").style.transform = ` rotate(${winLine[5]}deg) translate(${ winLine[3]}vw , ${winLine[4]}vw) `;

            document.getElementById("img").style.width="150px";

            game_win.play();
            
            game_over=true;

        }
    });

}



//Game logic entering values
 let boxes = document.getElementsByClassName("box");
//  console.log(boxes);

// let arrBox = Array.from(boxes);


Array.from(boxes).forEach(element => {
     
       let boxtext = element.querySelector(".boxtext");
       
       
       element.addEventListener('click' , () => {
               
              if(boxtext.innerText == ''){
                
                count++;
                // alert(count);
                click_audio.play();

                boxtext.innerText = turn;

                turn = changeTurn();

                checkWin();
                
                if(game_over == false){
                    document.querySelector(".info").innerText ="Turn of Player: " + turn; 
                }

            }

            if(count==9 && game_over==false){
                document.querySelector(".info").innerText ="Draw";
            }

       })

});


//Reset Button
document.getElementById("reset").addEventListener( "click" , () =>{

    click_audio.play();

    let boxtext=document.getElementsByClassName("boxtext");
    
    Array.from(boxtext).forEach((e)=>{
        e.innerText='';
        e.style.color="";
    });

    

    document.getElementById("img").style.width="0px";
    game_over=false;
    count=0;

    document.querySelector("#win-text").innerText ="";

    turn='X'
    document.querySelector(".info").innerText ="Turn of Player " + turn;
    
    document.querySelector(".line").style.width="0vw";


    game_win.pause();

});




