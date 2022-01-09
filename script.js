// ---------- CANVAS
let c = document.querySelector('canvas');
let ctx = c.getContext('2d');


// ---------- CANVAS INIT SETTINGS 
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

c.width = innerWidth;
c.height = innerHeight;
ctx.textAlign = "center";
// ---------- INITIAL LETTER ARRAYS
const lettersUS = 
['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','U','W','X','Y','Z',
'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z'];
const lettersPL = 
['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','R','S','Ś','T','U','W','X','Y','Z','Ź','Ż',
'a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','r','s','ś','t','u','w','x','y','z','ź','ż'];
const lettersJP = 
['ぁ','あ', 'ぃ', 'い', 'ぅ', 'う', 'ぇ', 'え', 'ぉ', 'お', 'か', 'が', 'き', 'ぎ', 'く', 'ぐ',
'け', 'げ', 'こ', 'ご', 'さ', 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 'た',
'だ', 'ち', 'ぢ', 'っ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の',
'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ', 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'み',
'ま', 'む', 'め', 'も', 'ゃ', 'や', 'ゅ', 'ゆ', 'ょ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'ゎ',
'わ', 'ゐ', 'ゑ', 'を', 'ん', 'ゔ', 'ゕ', 'ゖ', 'ゝ', 'ゞ', 'ゟ', '゠', 'ァ', 'ア', 'サ', 'ゴ',
'コ', 'ゲ', 'ケ', 'グ', 'ク', 'ギ', 'キ', 'ガ', 'カ', 'オ', 'ォ', 'エ', 'ェ', 'ウ', 'ゥ',
'イ', 'ィ', 'ザ', 'シ', 'ジ', 'ス', 'ズ', 'セ', 'ゼ', 'ソ', 'ゾ', 'タ', 'ダ', 'チ', 'ヂ', 'ッ', 'ツ', 'ヅ',
'テ', 'デ', 'ト', 'ホ', 'ペ', 'ベ', 'ヘ', 'プ', 'ブ', 'フ', 'ピ', 'ビ', 'ヒ', 'パ', 'バ', 'ハ', 'ノ', 'ネ',
'ヌ', 'ニ', 'ナ', 'ド', 'ボ', 'ワ', 'ヰ', 'ポ', 'マ', 'ヱ', 'ヲ', 'ミ', 'ム', 'ン', 'ヴ', 'メ', 'ャ', 'モ',
'ヵ', 'ヶ', 'ヤ', 'ュ', 'ユ', 'ョ', 'ヨ', 'ラ', 'ー', 'ヽ', 'リ', 'ル', 'ヾ', 'ヿ', 'レ', 'ロ', 'ヮ', '㍐', '㍿'];
const lettersBinary = [
'0','1'
];
const lettersDecimal = [
'0','1','2','3','4','5','6','7','8','9'
];
let current_letters = lettersDecimal;
const letter_font_default = 31;
let letter_font = letter_font_default;

let letter_width = Math.ceil(window.innerWidth/letter_font);   // x scale
let letter_height = Math.ceil(window.innerHeight/letter_font); // y scale

ctx.font = `${letter_font}px Courier New`; // fills matrix's like
let verticalOffset = 25;
let minSize = 25;
// ---------- WINDOW RESIZE HANDLER
window.addEventListener('resize', function(){
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;

    c.width = innerWidth;
    c.height = innerHeight;

    letter_width = Math.ceil(window.innerWidth/letter_font);   // x scale
    letter_height = Math.ceil(window.innerHeight/letter_font); // y scale
    // console.log("\t\tCONST");
    // console.log(`letter_font    = ${letter_font}`);
    // console.log(`letter_width   = ${letter_width}`);
    // console.log(`letter_height  = ${letter_height}`);
    ctx.font = `${letter_font}px Courier New`;
    allocMatrix();
    initMatrix();
});
// Main class
class Column {
    letters = [];
    colors = [];
    constructor(id, x){
        this.id = id;
        this.x = x;
        this.begin = Math.floor(Math.random() * letter_height) - verticalOffset;
        this.end = Math.floor(Math.random() * letter_height + verticalOffset) + this.begin;
        this.size = Math.floor(Math.random() * letter_height) + minSize;
        this.y = this.begin * letter_font;
    }
    // GETTERS
    getID(){
        return this.id;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getSize(){
        return this.size;
    }
    getBegin(){
        return this.begin;
    }
    getEnd(){
        return this.end;
    }
    // SETTERS
    setID(id){
        this.id = id;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    setSize(size){
       this.size = size;
    }
    setBegin(begin){
        this.begin = begin;
    }
    setEnd(end){
       this.end = end;
    }
    setLetter(index, letter){
        letters[index] = letter;
    }
    setColor(index, color){
        colors[index] = color;
    }
    addLetter(letter){
        this.letters.push(letter);
    }
    addColor(color){
        this.colors.push(color);
    }
    // OTHER
    moveMatrix(){
        // this.y += letter_height; //falling camera effect
        this.y += letter_font ;
    }
    fillMatrix(){
        for(let j = 0; j < this.size; j++){
            this.addLetter(
                current_letters[
                   Math.floor(Math.random()*current_letters.length)]);
            if( j == 0 ){
                this.addColor('rgba(255, 255, 255, 0.69)');
            }else{
                
                this.addColor(`rgba(0, 255, 0, ${1-(j/this.size) + 0.01})`);
            }
            // if( j == 0 ){
                // this.addColor('#aaa');
            // }else{
                // if(this.size < 25){
                //     this.addColor(`#00${100-(j*4)}00`);
                // }else if(this.size < 50){
                //     this.addColor(`#00${100-(j*2)}00`);
                // }else{
                //     this.addColor(`#00${100-j}00`);
                // } 
            // }
        }
    }
    newBegAndEnd(){
        this.begin = Math.floor(Math.random() * letter_height) - verticalOffset;
        this.end = Math.floor(Math.random() * letter_height + verticalOffset) + this.begin;
        this.size = Math.floor(Math.random() * letter_height) + minSize;
        this.fillMatrix();
        this.y = this.begin * letter_font;
    }
    show(){
        console.log(`--------------------`);
        console.log(`ID: ${this.id}`);
        console.log(`X: ${this.x}`);
        console.log(`Y: ${this.y}`);
        console.log(`Begin: ${this.begin}`);
        console.log(`End: ${this.end}`);
        console.log(`Size: ${this.size}`);
    }
    draw(){
        for(let i = 0; i < this.size ; i++){
            if(this.y - (letter_font*i) > this.end * letter_font || this.y - (letter_font*i) < this.begin * letter_font){
                continue;
            }else{
                ctx.fillStyle = this.colors[i];
                ctx.fillText(this.letters[i], this.x, this.y - (letter_font*i), letter_font);
                // ctx.strokeStyle = this.colors[i];
                // ctx.strokeText(this.letters[i], this.x, this.y - (letter_font*i), letter_font);
                
                // ctx.fillStyle = "yellow";
                // ctx.fillText(this.letters[0], this.x, this.begin * letter_font, letter_font);
                // ctx.fillStyle = "red";
                // ctx.fillText(this.letters[0], this.x, this.end * letter_font, letter_font);
            }
        }
        if(this.y > (this.end + this.size) * letter_font){
            this.newBegAndEnd();
        }
    }
    
}

// ---------- ANIMATION INIT SPEED
let refresh = 3;
let allocMatrix = () =>{
    let length = matrix.length;
    if(length < letter_width){
        for(let i = length; i < letter_width; i++){
            matrix.push(new Column(i+1, i*letter_font));
        }
    }
    if(length > letter_width){
        for(let i = length; i > letter_width; i--){
            matrix.pop();
        }
    }
    if(length == 0){
        matrix = [];
        for(let i = 0; i < letter_width; i++){
            matrix.push(new Column(i+1, i*letter_font));
        }
    }
}
let initMatrix = () =>{
    for(let i = 0; i < matrix.length; i++){
        matrix[i].fillMatrix();
   }
}
// ---------- MAIN ANIMATION
let matrix = [];
allocMatrix();
initMatrix();
let frame = 0;
function animate(){
    requestAnimationFrame(animate);
    if(frame % refresh == 0){
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for(let i = 0; i < matrix.length; i++){
            matrix[i].moveMatrix();
            matrix[i].draw();
        }
        frame = 0;
    }
    frame++;
}
animate();
// matrix.push(new Column(1, 25*letter_font, 15));
// matrix[0].addColor("green");
// for(let j = 0; j < matrix[0].size; j++){
//     matrix[0].addLetter(
//         current_letters[
//             Math.floor(Math.random()*current_letters.length)]);
// }
// function animate(){
//     requestAnimationFrame(animate);
//     if(frame % refresh == 0){
//         ctx.clearRect(0, 0, innerWidth, innerHeight);
//         matrix[0].y += letter_font;
//         matrix[0].draw();
//         // matrix[0].show();
//         frame = 0;
//     }
//     frame++;
// }
// animate();