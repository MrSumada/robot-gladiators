var fightOrSkip = function() {

  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  if (promptFight === "" || promptFight === null) {
  window.alert("You need to provide a valid answer! Please try again.");
  return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you suuuuure you'd like to quit?")

    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Lame.");
      playerInfo.money = Math.max(0, playerInfo.money - 10);

      return true;
      shop();

    } 
      window.alert("Well then, enjoy the fight!")
      
  }
  return false;

  if (promptFight !== "fight") {
    {
      window.alert("Looks like you have a typo. Hey, just try again!");
      return fightOrSkip();
      }
  }
};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {

  var isPlayerTurn = true;

  if(Math.random() > .5) {
    var isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {

   

    if (isPlayerTurn) {
    // ask player if they'd like to fight or run
      if (fightOrSkip()) {
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    }else{
      // remove players's health by subtracting the amount set in the enemy.attack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has been slain! Oh No!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    isPlayerTurn = !isPlayerTurn;
  }
  
  // else {
  //   window.alert("Please enter either FIGHT or SKIP.");
  // }
  //}
};

//function start a new game

var startGame = function() {
    //reset player stats
    playerInfo.reset();

    // fight each enemy-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
        //debugger;

        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];

        // reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

        // pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyObj);
        }

        // Ask if the player wants to enter the store
        if (playerInfo.health > 0 && i < enemyInfo.length - 1){
          var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?")
          if (storeConfirm){
          shop();
          }
       }
     }

    //play again?
    endGame();
};

var endGame = function() {
  window.alert("The game has ended. Let's see how you did!")

    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highScore = 0;
    }

    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);

      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }else{
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // if (playerInfo.health > 0) {
    //     window.alert("Great job, you've survived the game! you now have a score of " + playerInfo.money + ".");
    // } else {
    //     window.alert("You've lost your robot in battle.");
    // }
    
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thanks for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
  var shopOptionPrompt = window.prompt("Would you like to REFILL health, UPGRADE your attack, or LEAVE the store. Please enter 1 to REFILL, 2 to UPGRADE, or 3 to LEAVE.");

  shopOptionPrompt = parseInt(shopOptionPrompt);

  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");
      break;

    default:
      window.alert("Please pick a valid option.")
      shop();
      break;
  }
};

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling " + playerInfo.name + "'s health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading " + playerInfo.name + "'s attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }    
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
  name: "Robo Trumble",
  attack: randomNumber(10,14)
  }
];

// start the game when the page loads
startGame();
