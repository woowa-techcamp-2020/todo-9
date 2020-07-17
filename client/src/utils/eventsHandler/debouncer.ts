export const debouncer = (
  input: HTMLInputElement,
  validator: (input: string) => [boolean, string],
  onDebounce: (inputValue: string) => void
) => {
  let debounceTimeout = 0

  input.addEventListener('input', () => {
    if (debounceTimeout) {
      window.clearTimeout(debounceTimeout)
    }

    debounceTimeout = window.setTimeout(async () => {
      if (validator) {
        const [isValid, errMsg] = validator(input.value)

        // isValid ? setOk() : setErrMsg(errMsg)
      }

      onDebounce(input.value)
    }, 300)
  })
}
