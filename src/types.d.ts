interface ICommand {
    name: string,
    exec(): Promise<void>
}

interface HelpMeData {
    selectMode: boolean;
    selections: string[]
}