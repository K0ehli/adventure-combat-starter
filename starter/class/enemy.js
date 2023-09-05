const { Character } = require('./character');

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    //shuffle direction array;
    let direction = ['n', 's', 'e', 'w'];
    for (let i = direction.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [direction[i], direction[randomIndex]] = [direction[randomIndex], direction[i]];
    }

    for (let j = 0; j < direction.length; j++) {
      //if the exit exists, move to that room.
      if (this.currentRoom.exits[direction[j]]) {
        this.currentRoom = this.currentRoom.exits[direction[j]];
        this.cooldown += 1000;
        return;
      }
    }
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function () {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    if (this.attackTarget === null) {
    } else {
      this.attackTarget.applyDamage(this.strength);
      this.cooldown += 1000;
    }
  }

  applyDamage(amount) {
    // Fill this in
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;
    this.alert(`${this.name} scratches its nose`);
  }


}

// let room = new Room("Test Room", "A test room");
// let enemy = new Enemy('enemy', 'an ordinary character', room);
// console.log(enemy.act());
// console.log(enemy.act());


module.exports = { Enemy };