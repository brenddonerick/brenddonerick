export default function constelation(){
    const canvas = document.getElementById('canvas1');
    const ctx =  canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particlesArray = [];



    window.addEventListener('resize', ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });


    const mouse =  {
        x: undefined,
        y: undefined,
    }

    canvas.addEventListener('click', (event)=>{
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.addEventListener('mousemove', (event)=>{
        mouse.x = event.x;
        mouse.y = event.y; 
    });




    class Particle {
        constructor (){
            // this.x = mouse.x;
            // this.y = mouse.y;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * (canvas.height);
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() *2 - 1.5;
            this.speedY = Math.random() *2 - 1.5;
        }

        update(){
            this.x += this.speedX;
            this.y += this.speedY;

            // Mantem as bolinhas dentro da tela
            if( this.x > canvas.width) this.speedX = -this.speedX;
            if( this.x < 0) this.speedX = -this.speedX;
            if( this.y > canvas.height) this.speedY = -this.speedY;
            if( this.y < 0) this.speedY = -this.speedY;

            // 
        }

        draw(){
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, 2* Math.PI);
            ctx.fill();
        }
    }

    function init(){
        for (let i = 0; i < 50; i++){
            particlesArray.push( new Particle());
        }
    }
    init();


    function handleParticles(){
        for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();
            
            for(let j = i; j < particlesArray.length; j++){
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt((dx*dx) + (dy*dy));
                if(distance < 150){
                    ctx.beginPath();
                    ctx.strokeStyle = 'white';
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
        }
            if(particlesArray[i].size <= 0.3){
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }


    function animete(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animete);
    }
    animete();
}