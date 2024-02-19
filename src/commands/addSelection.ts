export default class AddSelection implements ICommand {
    name = "add-select";

    public async exec() {
        await AddSelection.behaviour();
    }

    public static async behaviour() {
        console.log(await browser.storage.local.get());
        let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;
        helpMeData.selectMode = !helpMeData.selectMode;


        await browser.storage.local.remove("HelpMeData");
        await browser.storage.local.set({ HelpMeData: helpMeData });

        console.log(helpMeData.selectMode);
    }
}