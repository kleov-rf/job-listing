export abstract class ValueObject<T> {
    protected readonly value: T;
    constructor(value: T) {
        this.value = value;
    }
}