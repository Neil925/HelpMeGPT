import AddSelection from "../commands/addSelection.js";
import ClearSelection from "../commands/clearSelection.js";
import GptSearch from "../commands/gptSearch.js";
import MassSelect from "../commands/massSelect.js";

async function main() {
    let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;
    let textArea = document.getElementById("selections-area") as HTMLTextAreaElement;

    textArea.value = helpMeData.selections.join("\n");
}

async function onUpdateSelections() {

}

async function textAreaSubmit() {
    let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;

    let textArea = document.getElementById("selections-area") as HTMLTextAreaElement;
    helpMeData.selections = textArea.value.split("\n");

    await browser.storage.local.remove("HelpMeData");
    await browser.storage.local.set({ HelpMeData: helpMeData });
}

function addSelect() {
    AddSelection.behaviour();
}

function massSelect() {
    MassSelect.behaviour();
}

function clearSelection() {
    ClearSelection.behaviour();
}

function askGpt() {
    GptSearch.behaviour();
}

main();