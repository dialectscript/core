
// === BASIC-style PRINT and INPUT functions ===
window.PRINT = function (text = "") {
  document.body.innerHTML += text + "\n";
  document.body.scrollTop = document.body.scrollHeight;  // auto-scroll
};

window.INPUT = function (prompt, callback) {
  PRINT(prompt);
  const input = document.createElement('input');
  input.autofocus = true;
  input.style.width = '80%';
  document.body.appendChild(input);

  const finish = () => {
    const value = input.value;
    PRINT(value);                // echo like real BASIC
    input.remove();
    document.body.scrollTop = document.body.scrollHeight;
    callback(value.trim());
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finish();
    }
  });

  // Also allow clicking away or blurring if you want
  input.addEventListener('blur', finish);
};


// === Define the async input function ===
async function input_(prompt = "") {
  const display = prompt ? prompt + " ? " : "? ";

  // Create hidden input field
  const inp = document.createElement("input");
  inp.type = "text";
  inp.style.position = "fixed";
  inp.style.left = "-9999px";
  inp.style.opacity = "0";
  inp.autofocus = true;
  document.body.appendChild(inp);

  // Print prompt in retro style
  console.log("%c" + display, "color: lime; background: black; font-family: monospace; font-weight: bold;");
  

  return new Promise((resolve) => {
    const finish = () => {
      const value = inp.value.trim();
      console.log("%c" + display + value, "color: lime; background: black; font-family: monospace; font-weight: bold;");
      document.body.removeChild(inp);
      resolve(value);
    };

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        finish();
      }
    });

    // Also finish if they click away or blur
    inp.addEventListener("blur", finish, { once: true });

    inp.focus();
  });
}

// === Now use it exactly like BASIC! ===
/*
  (async () => {
    console.clear();
    console.log("%cReady.", "color: yellow; font-weight: bold;");
    console.log("");

    let name = await input("What is your name");
    let age  = await input("How old are you");
    let quest = await input("What is your quest");

    console.log(`\nHello ${name.toUpperCase()}!`);
    console.log(`At age ${age}, seeking ${quest}... noble indeed.`);
    console.log("%cOk", "color: cyan; font-weight: bold;");
  })();
*/



