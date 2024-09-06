import { inject } from "@vercel/analytics"
const boxes = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.resetBtn');
const winnerPlayer = document.querySelector('#winnerPlayer');
const newGame = document.querySelector('#newGame');

const MSGBox = document.querySelector('.MSGBox');
const playerO = document.querySelector('#playerO');
const playerX = document.querySelector('#playerX');


let turnX = true;
let gameOver = false;
let modeCount = 0;
let Owins = 0;
let Xwins = 0;

const winnerPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],


]


boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
    if(gameOver) return;

    if(!box.classList.contains('disableBtn')){
    if(turnX){
        winnerPlayer.textContent = `X Turn`;
        
        box.innerText = 'O';
        box.style.color = 'green'
        turnX = false;

    }
    else{
        winnerPlayer.textContent = `O Turn`

        box.innerText = 'X';
        box.style.color = 'red';
        turnX = true;
    }
    }
    winner();   
    box.classList.add('disableBtn')
    modeCount++;
    
})

})

const  showWinner = (winner) =>{
    winnerPlayer.textContent = `${winner} is Winner`;
    MSGBox.style.backgroundColor = 'green';
    gameOver = true;

    boxes.forEach((box) =>{
        box.classList.add('disableBtn')
    })

    if(winner === 'O'){
       
        Owins ++;
        playerO.innerText = `Player1 (O): ${Owins}`;
        console.log(Owins);
        return;
        
    }
    else if(winner === 'X'){
        Xwins ++;
        playerX.innerText = `Player2 (X): ${Xwins}`;
        console.log(Owins);
    }
}


const winner = ()=>{
    for(pattern of winnerPatterns){
       let position1_Val = boxes[pattern[0]].innerText;
       let position2_Val = boxes[pattern[1]].innerText;
       let position3_Val = boxes[pattern[2]].innerText;
    if(position1_Val != "" && position2_Val != "" && position3_Val != ""){
        if(position1_Val === position2_Val && position2_Val === position3_Val){
            showWinner(position1_Val);
           
            return;
        }
        
    }
    
}

    if(modeCount === 9 && !gameOver){
        MSGBox.style.backgroundColor = 'red';
        winnerPlayer.textContent = 'Tied'
        gameOver = true;
    }
}



newGame.addEventListener('click', ()=>{
    boxes.forEach((box) =>{
        box.innerText = '';
        box.classList.remove('disableBtn')
        gameOver = false;

    })

    modeCount = 0;
    winnerPlayer.textContent = '';
    MSGBox.style.backgroundColor = ''; 
    Owins = 0;
    Xwins = 0;
    playerO.innerText = `Player1 (O): ${Owins}`;
    playerX.innerText = `Player1 (X): ${Xwins}`;

})


resetBtn.addEventListener('click', ()=>{
    boxes.forEach((box) =>{
        box.innerText = '';
        box.classList.remove('disableBtn')
        gameOver = false;

    })

    modeCount = 0;
    winnerPlayer.textContent = '';
    MSGBox.style.backgroundColor = '';  
})