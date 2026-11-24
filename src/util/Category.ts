import { Collection } from "discord.js";

/**A group of modules. */
export default class Category<K = string, V = any> extends Collection<K, V> {
    /** ID of the category. */
    private readonly id: string;

    /**
     * @param id - ID of the category.
     * @param iterable - Entries to set.
     */
    public constructor(id: string, iterable?: Iterable<readonly [K, V]>) {
        super(iterable);

        this.id = id;
    }

    /** Calls `reload()` on all items in this category. */
    public reloadAll(): Category<K, V> {
        for (const m of Array.from(this.values())) {
            if (m.filepath) m.reload();
        }

        return this;
    }

    /** Calls `remove()` on all items in this category. */
    public removeAll(): Category<K, V> {
        for (const m of Array.from(this.values())) {
            if (m.filepath) m.remove();
        }

        return this;
    }

    /** Return the ID of this category. */
    public toString(): string {
        return this.id;
    }
}