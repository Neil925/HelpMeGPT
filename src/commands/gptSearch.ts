export default class GptSearch implements ICommand {
    name = "gpt-search";

    public async exec() {
        await GptSearch.behaviour();
    }

    public static async behaviour() {
        console.log(await browser.storage.local.get());
    }
}
