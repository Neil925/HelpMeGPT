async function main() {
    let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;

    if (!helpMeData.selections.length)
        return;

    let textArea = document.querySelector("textarea#prompt-textarea");
    let button = textArea.parentElement.querySelector("button");

    if (!textArea || !button || !(textArea instanceof HTMLTextAreaElement))
        return;

    textArea.blur();
    textArea.value = helpMeData.selections.join("\n\n");
    textArea.focus();

    helpMeData.selections = [];

    await browser.storage.local.remove("HelpMeData");
    await browser.storage.local.set({ HelpMeData: helpMeData });    
}

setTimeout(main, 1500);