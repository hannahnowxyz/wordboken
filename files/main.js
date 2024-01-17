var currentLogDivID = 0;
const pyscriptBaseURL = "https://pyscript.net/releases/2024.1.1";

function logDiv(textString) {
    let newDiv = document.createElement("div");
    newDiv.id = `logDiv-${currentLogDivID}`;
    newDiv.innerText = textString;
    document.getElementById("loading-output").appendChild(newDiv);
    currentLogDivID++;
}

function getCaller(error) {
    return "[" + error.stack.split("\n").slice(-1)[0].slice(4) + "]:\n";
}

{   let unhookedConsoleLog = console.log;
    let unhookedConsoleDebug = console.debug;
    let unhookedConsoleInfo = console.info;
    let unhookedConsoleError = console.error;
    console.log = (args) => {logDiv(getCaller(new Error()) + args); unhookedConsoleLog(args);};
    console.debug = (args) => {logDiv(getCaller(new Error()) + args); unhookedConsoleDebug(args);};
    console.info = (args) => {logDiv(getCaller(new Error()) + args); unhookedConsoleInfo(args);};
    console.error = (args) => {logDiv(getCaller(new Error()) + args); unhookedConsoleError(args);};
    window.addEventListener("error", (event) => {logDiv(event + ":\n" + event.message);});
    window.addEventListener("unhandledrejection", (event) => {logDiv(event + ":\n" + event.reason);});
}

logDiv("hello from main.js");
logDiv(`loading pyscript... (${pyscriptBaseURL})`);
{   let pyscriptScriptElement = document.createElement("script");
    pyscriptScriptElement.type = "module";
    pyscriptScriptElement.src = `${pyscriptBaseURL}/core.js`;
    document.head.appendChild(pyscriptScriptElement);
}
