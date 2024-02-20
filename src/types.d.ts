interface ICommand {
    name: string,
    exec(): Promise<void>
}

interface HelpMeData {
    selectMode: boolean,
    massSelect: boolean,
    selections: string[],
}