export default class ClearSelection implements ICommand {
    name = "clear-selection";

    public async exec() {
        await ClearSelection.behaviour();
    }

    public static async behaviour() {
        console.log(await browser.storage.local.get());
    }
}