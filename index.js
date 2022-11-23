document.addEventListener('DOMContentLoaded',()=>{
   //store in player 1 and player 2
   let player1= document.getElementById("player1Name");
   let player2= document.getElementById("player2Name");

   //display both name and the X/O in the display section
   let displayName = document.querySelector(".displayPlayerName");
   let displaySign = document.querySelector(".displayPlayerSign");
   let currentPlayer = 'X';

   //assign button
   let btn = document.querySelector(".submit");

   //assign Tiles
   let tiles = document.querySelectorAll(`[data-tile]`);

   //sounds
   let choice = document.getElementById("bubble");
   let reButton = document.getElementById("click");

   //win condition
   const winCondition=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];

   //announce the winner / draw
   let announcer = document.querySelector(".displayAnnouncer");

   // reset button and continue
   let resetButton = document.querySelector(".reset");
   let continueButton = document.querySelector(".continue");

   btn.addEventListener('click', ()=>{
      displayName.textContent= player1.value;
   });

   tiles.forEach(tile =>{
      tile.addEventListener('click', clickTiles);
   });

   function clickTiles(e) {
      const tile = e.target;
      placement(tile);
      if(condition(currentPlayer)){
         endGame(false);
      }
      else if(isDraw()){
         endGame(true);
      }
      else {
      changePlayer();
      }
   };
   
   const placement=(tile)=>{
      tile.textContent = currentPlayer;
      tile.classList.add(currentPlayer);
      tile.style.fontFamily = "'Monoton', cursive";
      tile.style.fontSize = "5.5em";
      if(currentPlayer === 'O'){
         tile.style.color = "white";
         tile.style.background = "teal";
         choice.play();
      }
      else{
         tile.style.color = "white";
         tile.style.background = "orangered";
         choice.play();
      }
   };

   const condition=(currentPlayer)=>{
      return winCondition.some(combination =>{
         return combination.every(index => {
            return tiles[index].classList.contains(currentPlayer);
         })
      })
   };

   const endGame =(draw)=>{
      if (draw){
        announcer.textContent = `DRAW!`;
         return;
      }
      else if (currentPlayer ==='O'){
         announcer.textContent = `${player2.value} WIN!`;
         return;
      }
      else {
         announcer.textContent = `${player1.value} WIN!`;
         return;
      }
   };

   const isDraw=()=>{
      return [...tiles].every(cell =>{
         return cell.classList.contains('X') || cell.classList.contains('O');
      });
   };

   const changePlayer =() => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer ==='O'){
         displayName.textContent = player2.value;
         displaySign.textContent = currentPlayer;
      }
      else {
         displayName.textContent = player1.value;
         displaySign.textContent = currentPlayer;
      };
   };

   resetButton.addEventListener('click', ()=>{
      tiles.forEach(tile=>{
         player1.value = '';
         player2.value = '';
         tile.style.background = "";
         displayName.textContent= 'PLAYER 1';
         displaySign.textContent= 'X';
         currentPlayer = 'X';
         tile.classList.remove('X');
         tile.classList.remove('O');
         tile.textContent= '';
         announcer.textContent = '';
         reButton.play();
      })
   });

   continueButton.addEventListener('click', ()=>{
      tiles.forEach(tile=>{
         displayName.textContent= player1.value;
         displaySign.textContent= 'X';
         tile.style.background = "";
         currentPlayer = 'X';
         tile.classList.remove('X');
         tile.classList.remove('O');
         tile.textContent= '';
         announcer.textContent = '';
         reButton.play();
      })
   })
});