let table;
let randomRow;
let selectedUsername;
let selectedTimestamp;
let selectedCategory;
let selectedMessage;
let categories = ["Buying/selling", "Local event", "Crime", "Other", "Services", "Politics", "Lost items", "Post"];
let bot;

function preload() {
  img = loadImage("assets/street chatbot 2.0.png");
    table = loadTable("assets/facebook_data.csv", "csv", "header");
    // Load and initialize your RiveScript chatbot
    bot = new RiveScript();
    bot.loadFile("assets/brain.rive", () => {
        console.log("Bot loaded!");
        bot.sortReplies(); // Call sortReplies() after loading the bot
    });
}

function setup() {
    createCanvas(1000, 660);
    textSize(16);
    textAlign(CENTER, CENTER);
    noLoop();

    // Create text input field for user input
    let input = createInput();
    input.position(width/2 -340, height/2);
    input.size(200);
    input.attribute("placeholder", "Type your message here...");

    // Set up event listener for user input
    input.changed(() => {
        let userInput = input.value();
        input.value(""); // Clear input field
        handleUserInput(userInput);
    });
}

function draw() {
    background(img);
    // Draw the chatbot response
    drawChatbotResponse();
}

function handleUserInput(userInput) {
  // Process user input using the chatbot
  bot.reply("local-user", userInput).then(botReply => {
      console.log("Bot reply:", botReply);

      // Check the bot's response
      if (botReply.includes("crime report")) {
          // Display a crime report
          displayRandomMessage("Crime");
      } else if (botReply.includes("buying") || botReply.includes("selling")) {
          // Display buying/selling posts
          displayRandomMessage("Buying/selling");
      } else if (botReply.includes("local event")) {
          // Display local event posts
          displayRandomMessage("Local event");
      } else if (botReply.includes("services")) {
          // Display services posts
          displayRandomMessage("Services");
      } else if (botReply.includes("Politics")) {
          // Display politics posts
          displayRandomMessage("Politics");
      } else if (botReply.includes("lost items")) {
          // Display lost items posts
          displayRandomMessage("Lost items");
      } else {
          // Display the bot's generic response
          selectedMessage = botReply;
          redraw();
      }
  });
}
function displayRandomMessage(category) {
  let categoryColumn = table.getColumn("Category");

  // Find rows matching the specified category
  let rows = [];
  for (let i = 0; i < categoryColumn.length; i++) {
      if (categoryColumn[i] === category) {
          rows.push(table.getRow(i));
      }
  }

  // If rows are found for the category, select a random row
  if (rows.length > 0) {
      let randomIndex = floor(random(rows.length));
      randomRow = rows[randomIndex];

      selectedUsername = randomRow.getString("Username");
      selectedTimestamp = randomRow.getString("Timestamp");
      selectedCategory = randomRow.getString("Category");
      selectedMessage = randomRow.getString("Message");

      redraw();
  } else {
      console.log(`No entries found for category: ${category}`);
  }
}
function drawChatbotResponse() {
  // Define box dimensions and position
  let boxWidth = 500;
  let boxHeight = 125; 
  let boxX = width / 2 - boxWidth / 2 - 100;
  let boxY = height / 2 + 40;

  // Draw message box
  fill(60); 
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight);

  // Draw selected message (bot response) inside the box
  textSize(20);
  fill(255);
  textAlign(CENTER, CENTER);
  let messageX = boxX; 
  let messageY = boxY; 
  let messageWidth = boxWidth - 40; 
  let messageHeight = boxHeight - 40; 

  // Check if the message width exceeds the box width
  let messageTextWidth = textWidth(selectedMessage);
  if (messageTextWidth > messageWidth) {
      textSize(14); 
      messageTextWidth = textWidth(selectedMessage);
  }

  // Draw username and timestamp
  textSize(12);
  textAlign(LEFT, TOP);
  let userTimestampX = boxX + 10;
  let userTimestampY = boxY + boxHeight - 25; 
  text(selectedUsername + " - " + selectedTimestamp, userTimestampX, userTimestampY);

  // Draw message text
  text(selectedMessage, messageX, messageY, messageWidth, messageHeight);
}


  // Draw username and timestamp
  textSize(12);
  textAlign(LEFT, TOP);
  let userTimestampX = boxX ;
  let userTimestampY = boxY + boxHeight; 
  text(selectedUsername + " - " + selectedTimestamp, userTimestampX, userTimestampY);

  // Draw message text
  text(selectedMessage, messageX, messageY, messageWidth, messageHeight);