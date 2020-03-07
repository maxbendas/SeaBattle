const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');

const game = {
  ships: [
    {
      location: ['36', '37', '38', '39'],
      hit: ['', '', '', '']
    },
    {
      location: ['21', '22', '23'],
      hit: ['', '', '']
    },
    {
      location: ['05', '06'],
      hit: ['', '']
    },
    {
      location: ['25'],
      hit: ['']
    },
  ],
  shipsCount: 4,
};

const play = {
  record: localStorage.getItem('seaBattleRecord') || 0,
  shot: 0,
  hit: 0,
  dead: 0,
  set updateData(data) {
    this[data]++;
    this.render();
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
    this.changeClass(elem, 'hit')
  },
  miss(elem) {
    this.changeClass(elem, 'miss')
  },
  dead(elem) {
    this.changeClass(elem, 'dead')
  },
  changeClass(elem, value){
    elem.className = value;
  }
};

const fire = (event) => {
  const target = event.target;
  if (target.classList.length !== 0 || target.tagName !== 'TD' || !game.shipsCount) return;
  show.miss(target);
  play.updateData = 'shot';

  for (let i = 0; i < game.ships.length; i++) {
    const ship = game.ships[i];
    const index = ship.location.indexOf(target.id);
    if (index >= 0) {
      show.hit(target);
      play.updateData = 'hit';
      ship.hit[index] = 'x';
      const life = ship.hit.indexOf('');
      if (life < 0) {
        play.updateData = 'dead';
        for (const id of ship.location) {
          show.dead(document.getElementById(id));
        }

        game.shipsCount -= 1;

        if (game.shipsCount < 1) {
          header.textContent = 'Game Over';
          header.style.color = 'red';

          if (play.shot < play.record || play.record === 0 ) {
            localStorage.setItem('seaBattleRecord', play.shot);
            play.record = play.shot;
            play.render();
          }

        }
      }
    }

  }

};


const init = () => {
  enemy.addEventListener('click', fire);
  play.render();

  again.addEventListener('click', ()=> {
  location.reload();
  });

  record.addEventListener('dblclick', ()=> {
    play.record=0;
    play.render();
  })
};

init();





