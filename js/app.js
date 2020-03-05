const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');

const game = {
  ships:[
    {
      location:['26', '36', '46', '56'],
      hit: ['', '', '', '']
    },
    {
      location:['12', '13', '14'],
      hit: ['', '', '']
    },
    {
      location:['69', '79'],
      hit: ['', '']
    },
    {
      location:['32'],
      hit: ['']
    },
  ],
  shipCount: 4,
}
const play = {
  record: localStorage.getItem('seaBattleRecord') || 0,
  shot: 0,
  hit: 0,
  dead: 0,
  set updataData(data){
    play[data] += 1;
    play.render();
  },
  render(){
    record.textContent = this.record;
    shot.textContent = this.shot;
    hit.textContent = this.hit;
    dead.textContent = this.dead;
  }
};
const show = {
  hit(elem) {
    this.chenchClass(elem, 'hit');
  },
  miss(elem) {
    this.chenchClass(elem, 'miss');
  },
  dead(elem) {
    this.chenchClass(elem, 'dead');
  },
  chenchClass(elem, value) {
   elem.className = value;
  }
}
const fire = function (event) {
  const target = event.target;
  if(target.classList.length !== 0 || target.tagName !== 'TD') return;
  show.miss(target);
  play.updataData = 'shot';

  for (let i = 0; i < game.ships.length; i++) {
    const ship = game.ships[i];
    const index = ship.location.indexOf(target.id);
    if(index >= 0){
      show.hit(target);
      play.updataData = 'hit';
      ship.hit[index] = 'x';
      const life = ship.hit.indexOf('');
      if (life < 0) {
        play.updataData = 'dead';
        for (const cellId of ship.location) {
          show.dead(document.getElementById(cellId));
        }

        game.shipCount -= 1;
        console.log(game.shipCount);
        if (game.shipCount < 1) {
           header.textContent = 'Игра окончена!';
           header.style.color = 'red';

          if (play.shot < play.record || play.record === 0){
            localStorage.setItem('seaBattleRecord', play.shot);
            play.record = play.shot;
            play.render();
          }
           
        }
      }
    }
    
  }

};
const init = function () {
  enemy.addEventListener('click', fire);
  play.render();

  again.addEventListener('click', () => {
    location.reload();
  });
};
init();


