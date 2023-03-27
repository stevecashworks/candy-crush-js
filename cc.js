const  grid= document.querySelector('.grid')
const scoreBoard=document.getElementById('score')
let score=0;
let draggedId;

//The play Button triggers the showgGrid function
function showGrid(){
    grid.style.display= 'flex'
    // setTimeout(()=>{for(let x=0; x<63;x++){
        // checkWin(x)
        
    // }},300)
}
const images={
    blue:'./CandyImages/blueSphere.jpg',
    yellow:'./CandyImages/droplet.png',
    orange:'./CandyImages/elipseCandy.png',
    green:'./CandyImages/greenSquareCandy.png',
    red:'./CandyImages/redCandy.png',
    purple:'./CandyImages/Untitled.jpg'
}
const candies=[];
let swapped;
const edges=[7,15,23,31,49,47,55,63]

const backgroundImage=id=>document.getElementById(id).style.backgroundImage
const {blue,yellow,orange,green,red,purple}=images;
const imageArray=[blue,yellow,orange,green, red,purple]
const topRow=[0,1,2,3,4,5,6,7]
function addTopRow(){
    for(let id of topRow){
        if(backgroundImage(id)===''){
            const randomCandy= imageArray[Math.floor(Math.random()*imageArray.length)]
            document.getElementById(id).style.backgroundImage=`url(${randomCandy})`
        }
    }
}
for(let i=0;i<64;i++){
    const candyType= imageArray[Math.floor(Math.random()*imageArray.length)]
    let candy=document.createElement('div')
    candy.setAttribute('class', 'candy');
    candy.setAttribute('draggable',true)
    candy.setAttribute('id',i);
    candy.style.backgroundImage= `url(${candyType})`
    candies.push(candy)
    grid.appendChild(candy)
}
function movedown(){
    for(let i=0;i<55;i++){

        if(backgroundImage([i+8])===''){
           
            candies[i+8].style.backgroundImage=backgroundImage(i)
        candies[i].style.backgroundImage='';
        addTopRow()
        
        }
    }
}
function swap(id1,id2){
    let first= backgroundImage(id1)
    let second= backgroundImage(id2)
    document.getElementById(id1).style.backgroundImage=second;
    document.getElementById(id2).style.backgroundImage=first;

}
function dragStart(){
 console.log('start', this.id)
 draggedId=this.id
}
function checkWin(id){
    id= parseInt(id)
    
    const CheckWinRows=(id)=>{
        let rowWins=1;
        let confirmedIds=[id]

        const checkLeft=(id)=>{
            if(id>0){
         if(backgroundImage(id)===backgroundImage(id-1)){
        rowWins++;
        confirmedIds.push(id+1)
        checkLeft(id-1); 
        }
         }
        }
        const checkRight=(id)=>{
            if(id<63){
                if(backgroundImage(id)===backgroundImage(id+1)){
                 if(!edges.includes(id)){   rowWins++;
                    confirmedIds.push(id+1)
                    checkRight(id+1)
                 }
                }
            }

        }
        checkRight(id)
        checkLeft(id)
        return{arrangement:'rows',enough:(rowWins>=3),wins:rowWins,confirmedIds}
    }
    const checkWinCols=(id)=>{
        let colWins=1; 
        let=confirmedIds=[id]
        
 const checkUp=(id)=>{
    if(id>7){
    
         if(backgroundImage(id-8)=== backgroundImage(id)){
             colWins++;
             confirmedIds.push(id-8)
             checkUp(id-8)
         }


     }

 }
const checkDown=(id)=>{
    if(id<56){
        if(backgroundImage(id)===backgroundImage(id+8)){
            colWins++;
            confirmedIds.push(id+8)

            checkDown(id+8)
        }
    }
} 
checkDown(id);
checkUp(id)
return{arrangement:'cols',enough:(colWins>=3),wins:colWins,confirmedIds}
}
const results=[checkWinCols(id),CheckWinRows(id)];
let points=0
for(let result of results){
    if(result.enough){
        score+=result.wins
        for (let id of result.confirmedIds){
            candies[id].style.backgroundImage=''
            candies[id].style.backgroundColor='white'
        }
    }
}
scoreBoard.innerHTML=score
console.log(...results)


}
function dragEnter(){
    console.log('enter', this.id)
}
function dragOver(e){
    e.preventDefault()
    
}
function dragLeave(){
    console.log('leave', this.id)
}
function dragEnd(){
    console.log('end', this.id)
}
function dragDrop(){
    console.log('drop', this.id)
  
    swap(draggedId,this.id)
    let diff= draggedId-this.id
   
    if(!((diff===1)||(diff===-1)||(diff===8)||(diff===-8))){
        setTimeout(()=>swap(this.id, draggedId),300)
    }
    checkWin(this.id)
}
for(let candy of candies){
candy.addEventListener('dragstart',dragStart);
candy.addEventListener('dragenter',dragEnter);
candy.addEventListener('dragover',dragOver);
candy.addEventListener('dragleave',dragLeave);
candy.addEventListener('drop',dragDrop);
candy.addEventListener('dragend', dragEnd)
}

setInterval(movedown,150)
