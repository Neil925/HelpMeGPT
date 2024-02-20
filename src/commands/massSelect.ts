export default class MassSelect implements ICommand {
    name = "mass-select";

    public async exec() {
        await MassSelect.behaviour();
    }

    public static async behaviour() {
        let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;
        helpMeData.selectMode = !helpMeData.selectMode;
        helpMeData.massSelect = helpMeData.selectMode;

        await browser.storage.local.remove("HelpMeData");
        await browser.storage.local.set({ HelpMeData: helpMeData });
    }
}