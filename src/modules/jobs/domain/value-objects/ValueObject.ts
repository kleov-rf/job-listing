export abstract class ValueObject<T> {
    protected readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    public getValue(): T {
        return this.value
    }

    public equals(other: ValueObject<T>): boolean {
        return this.value === other.value
    }
}