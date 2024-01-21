const pyodideURL = `https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js`;
var numDivsCreated = 0;

window.createDiv = function(text) {
    let newDiv = document.createElement(`div`);
    newDiv.id = `output-div-${numDivsCreated}`;
    newDiv.innerHTML = text;
    document.getElementById(`text-output`).appendChild(newDiv);
    numDivsCreated++;
}

window.addEventListener(`error`, (event) => {createDiv(
    `[window]: unhandled ErrorEvent:<br/>` +
    `<div class="text-output-error">${event.message}</div>`
    );});
window.addEventListener(`unhandledrejection`, (event) => {createDiv(
    `[window]: unhandled PromiseRejectionEvent:<br/>` +
    `<div class="text-output-error">${event.reason}</div>`
    );});

createDiv(`hello from main.js`);
createDiv(`getting pyodide from ${pyodideURL} ...`);
await import(pyodideURL);
createDiv(`initializing pyodide ...`);
const pyodide = await loadPyodide({
    stdout: (msg) => createDiv(`[pyodide]: ${msg}`),
    stderr: (msg) => createDiv(`[pyodide]:<br/><div class="text-output-error">${msg}</div>`),
    });
createDiv(`getting files for emscripten virtual filesystem ...`);
pyodide.unpackArchive(await (await fetch(`/files/emfs.zip`)).arrayBuffer(), `zip`);
createDiv(`running hello.py ...`);
pyodide.runPython(`exec(open("hello.py").read())`);
createDiv(`getting micropip ...`);
await pyodide.loadPackage(`micropip`);
createDiv(`getting packages ...`);
await pyodide.runPythonAsync(
    `import micropip\n` +
    `micropip.install("transformers", keep_going=True)`
    );
//ValueError: Can't find a pure Python 3 wheel for: 'safetensors>=0.3.1', 'tokenizers<0.19,>=0.14'
//this seems intractable. these packages require rust binaries and building them as emscripten/wasm
//wheels requires significant patching beyond my ability. it has been done before, but this approach
//seems dubious at the moment (https://github.com/josephrocca/tokenizers-pyodide).
