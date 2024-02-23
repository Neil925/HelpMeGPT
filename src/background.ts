import AddSelection from "./commands/addSelection.js";
import ClearSelection from "./commands/clearSelection.js";
import GptSearch from "./commands/gptSearch.js";
import MassSelect from "./commands/massSelect.js";

const commands: ICommand[] = [
    new AddSelection(),
    new ClearSelection(),
    new GptSearch(),
    new MassSelect()
];

async function main() {
    let helpMeData = {
        selectMode: false,
        massSelect: false,
        selections: []
    } as HelpMeData;

    let data = (await browser.storage.local.get("HelpMeData")).HelpMeData;

    if (data)
        helpMeData = data as HelpMeData

    await browser.storage.local.remove("HelpMeData");
    await browser.storage.local.set({ HelpMeData: helpMeData });

    console.log("The following commands are present for this extension: ");
    for (let command of await browser.commands.getAll()) {
        console.log(command);
    };

    for (let command of commands) {
        browser.commands.onCommand.addListener(async (commandName) => {
            if (command.name != commandName) return;

            try {
                await command.exec();
            } catch (error) {
                await browser.action.openPopup();
                console.error(`Something went wrong with execution of command: ${commandName}.`);
                console.error(error);
            }
        });

        console.log(`Event ${command.name} has been subscribed.`);
    }
}

main();