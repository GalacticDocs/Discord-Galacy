export abstract class Plugin {
    abstract name: string;
    abstract instance: typeof Plugin;
}

export default class PluginManager {
    private plugins: Plugin[] = [];

    protected includes(name: string) {
        const plugin = this.plugins.find((x) => x.name === name);

        return plugin ? true : false;
    }
}