const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage(){

  const message = userInput.value.trim();

  if(!message) return;

  addMessage(message, "user");

  userInput.value = "";

  const botDiv = addMessage("Thinking...", "bot");

  try{

    const response = await fetch(
      "https://pocketdev-ai-2.onrender.com",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:message
        })
      }
    );

    const data = await response.json();

    botDiv.innerText =
      data.choices?.[0]?.message?.content ||
      data.error ||
      "No response.";

  }

  catch(error){

    console.log(error);

    botDiv.innerText =
      "Server error.";
  }
}

function addMessage(text, type){

  const div = document.createElement("div");

  div.classList.add("message");
  div.classList.add(type);

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;

  return div;
}
