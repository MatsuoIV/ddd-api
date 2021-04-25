export class Result<T> {
  isSuccess: boolean
  isFailure: boolean
  error: string
  #value: T

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this.#value = value
  }

  getValue(): T {
    return this.#value
  }

  static ok<U> (value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }
  static fail<U> (error: string): Result<U> {
    return new Result<U>(false, error)
  }
}