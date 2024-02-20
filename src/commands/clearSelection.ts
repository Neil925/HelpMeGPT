export default class ClearSelection implements ICommand {
    name = "clear-selection";

    public async exec() {
        await ClearSelection.behaviour();
    }

    public static async behaviour() {
        let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;
        helpMeData.selections = [];

        await browser.storage.local.remove("HelpMeData");
        await browser.storage.local.set({ HelpMeData: helpMeData });
    }
}