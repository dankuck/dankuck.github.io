class Promise
{
    constructor(resolver)
    {
        var promise = this;
        resolver(
            function (value) {
                promise.complete = true;
                promise.hasValue = true;
                promise.value = value;
                promise.checkThen();
            },
            function (error) {
                promise.complete = true;
                promise.hasError = true;
                promise.error = error;
                promise.checkThen();
            }
        );
    }

    checkThen()
    {
        if (!this.complete) {
            return;
        }
        if (this.onResolve && this.hasValue) {
            this.onResolve(this.value);
        }
        if (this.onError && this.hasError) {
            this.onError(this.error);
        }
    }

    then(onResolve, onError)
    {
        this.onResolve = onResolve;
        this.onError = onError;
        this.checkThen();
    }
}