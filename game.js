const canvas = document.querySelector('#canvas');
const background = new Image();
const stayGG = new Image();
const rigthGG = new Image();
const leftGG = new Image();
const dangerZone = new Image();
const safeBlock = new Image();
const defeat = new Image();
const win = new Image();
const path = 'images/';
const maxDistance = 80;

const imagesName = ['platformBack.png', 'dangerZone.png', 'leftGG.png', 'rigthGG.png', 'safeblock.png', 'stayGG.png', 'win.png', 'defeat.png'];
const images = [background, dangerZone, leftGG, rigthGG, safeBlock, stayGG, win, defeat];
const ctx = canvas.getContext('2d');


const troubleX = [200, 600, 1000];
const saveX = [250, 750];


for (let i = 0; i < images.length; i++){
    images[i].src = path + imagesName[i];
}

let heroX = 50;
let heroY = 200;
let currentDistance = 0;

let status = 'inProcess';

function isOnPlatform (x) {
    if (x >= 150 && x <= 450 || x >= 750 && x <= 1050) {
        return 50;
    } else {
        return 200;
    }
}

function isWin() {
    if (heroX >= 1400 && heroY >= 200) {
        status = 'win';
    }
}

function isDefeat() {
    troubleX.forEach( el => {
        if (heroX >= el && heroX <= el + 300 && heroY >= 200) {
            status = 'defeat';
        }
    })
}

function drawHero(direction) {
    switch (direction){
        case 'left':
            ctx.drawImage(leftGG, heroX, heroY);
            break;
        case 'rigth':
            ctx.drawImage(rigthGG, heroX, heroY);
            break;
        default:
            ctx.drawImage(stayGG, heroX, heroY);
            break;
        
    }
}

function drawTrouble(){
    for(let i = 0; i < troubleX.length; i++) {
        ctx.drawImage(dangerZone, troubleX[i], 300);
    }
}

function drawSave(){
    for(let i = 0; i < saveX.length; i++) {
        ctx.drawImage(safeBlock, saveX[i], 200);
    }
}

function heroDown() {
    if (heroY <= 200) {
        if (heroY <= isOnPlatform(heroX)) {
            heroY += 5;
            drawScena();
            let timeout = setTimeout(heroDown, 1000/60);
            if (heroY >= 200) {
                clearInterval(timeout);
                return;
            }
        }
       
    } else {
        return;
    }
}

function heroJump(){
    heroY -= 5;
    drawScena('front');
    let timeout = setTimeout(heroJump, 1000/60);
    if (heroY <= 0) {
        clearInterval(timeout);
        heroDown();
        return;
    }
}

function canMove() {
    if (heroX > 0 && heroX <= 125 || heroX >= 545 && heroX <= 650 || heroX >= 1050) {
        return true;
    } else {
        if (heroY >= 200) {
            return false;
        } else {
            return true;
        }
    }
}

function heroLeft() {
    heroDown();

if (canMove()){
    if (heroX >= 10) {
        heroX -=5;
        drawScena('left');
        let timeout = setTimeout(heroLeft, 1000/60);
        currentDistance += 5;

        if (currentDistance >= maxDistance) {
            clearTimeout(timeout);
            currentDistance = 0;
            return;
        }

    } 

}
    
}

function heroRigth() {
    heroDown();
if (canMove()){
    if (heroX <= 1500) {
        heroX += 5;
        drawScena('rigth');
        let timeout = setTimeout(heroRigth, 1000/60);
        currentDistance += 5;

        if (currentDistance >= maxDistance) {
            clearTimeout(timeout);
            currentDistance = 0;
            return;
        }

    }
}
}
    

function moveHero (event){
    if (event.code === 'KeyW') {
        heroJump();
    }
    if (event.code === 'KeyA') {
        heroLeft();
    }
    if (event.code === 'KeyD') {
        heroRigth();
    }

}

function drawScena(direction) {
    console.log(status);
    isWin();
    isDefeat();
    switch (status) {
        case 'inProcess':
            ctx.clearRect(0, 0, 1600, 400);
            ctx.drawImage(background, 0, 0);
            drawTrouble();
            drawSave();
            drawHero(direction);
            break;
        case 'win':
            ctx.clearRect(0, 0, 1600, 400);
            ctx.drawImage(win, 0, 0);
            break;
        case 'defeat':
            ctx.clearRect(0, 0, 1600, 400);
            ctx.drawImage(defeat, 0, 0);
            break;
    }
}


setTimeout(() => drawScena(), 200);
document.addEventListener('keydown', moveHero);