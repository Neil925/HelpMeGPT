export default class GptSearch implements ICommand {
    name = "gpt-search";

    public async exec() {
        await GptSearch.behaviour();
    }

    public static async behaviour() {
        let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;
        let tab = (await browser.tabs.query({ currentWindow: true })).find(x => x.url.includes("https://chat.openai.com"));

        if (tab) {
            await browser.tabs.update(tab.id, { active: true });
            await browser.tabs.reload(tab.id);
            return;
        }

        let preface = "For this question and the ones to follow in this chat thread, please keep in mind the following:\n";
        preface += "- So long as one of the options presented is a valid answer, do not go into detail with your response and simply let me know which one you believe is correct.\n";
        preface += "- If no extra options are presented and a question can be answered as either \"True\" / \"False\", then please do so.\n";
        preface += "\nHere is the first question: \n";

        helpMeData.selections.unshift(preface);

        await browser.storage.local.remove("HelpMeData");
        await browser.storage.local.set({ HelpMeData: helpMeData });

        await browser.tabs.create({ url: "https://chat.openai.com" });
    }
}
