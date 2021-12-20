
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// console.log(enemyNames)
// console.log(enemyNames[0])
// console.log(enemyNames[1])
// console.log(enemyNames[2])
// console.log(enemyNames.length)

for(var i = 0; i < enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}

// Game States
// "WIN" - Player defeats all the enemy robots
//      * Fight all enemy robots
//      * Defeat all enemy robots
// "LOSE" - Player's robot health is 0 or less

//window.alert("Welcome to Robot Gladiators!");

var fight = function(enemyName) {
    
    // repeat and execute as lon as the enemy robot is alive
    while(enemyHealth > 0) {

        // fight function statements

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        // if player chooses FIGHT
        if (promptFight === "fight" || promptFight === "FIGHT" || promptFight === "Fight") {

            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth = enemyHealth - playerAttack;
            
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " remaining."
            );

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has fallen in battle!")
            }else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth =  playerHealth - enemyAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " retaliated against " + playerName + ". " + playerName + " now has " + playerHealth + " remaining."
            );

            //check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has been slain!");
            }else {
                window.alert(playerName + " has " + playerHealth + " health remaining.");
            }
        }else if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            var confirmSkip = window.confirm("Are you sure you wat to skip this fight?");

            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                playerMoney = playerMoney - 2;
            }else {
                fight();
            }
        }else {
            window.alert("You need to choose a valid option. Try again!")
        }
    }
}

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyNam = enemyNames[i];
    enemyHealth = 50;
    fight(enemyNames[i]);
}