function validateInput(inputType: 'scope' | 'packageName', value: string): string | void {
  // Regex for validating scope and package names
  const scopeRegex = /^@[a-z0-9-_]+$/;
  const packageNameRegex = /^(?!.*\..\.)[a-z0-9_.-]+$/;

  if (inputType === 'scope') {
    if (!value.startsWith('@')) {
      value = '@' + value;
    }

    if (!scopeRegex.test(value)) {
      return "Invalid scope format. Scope must be lowercase letters, numbers, '-', or '_'.";
    }
  } else if (inputType === 'packageName' && !packageNameRegex.test(value)) {
    return "Invalid package name format. Package name must be lowercase, can include '-', '_', or '.', but not start or end with '.', or contain '..'";
  }
}

export { validateInput };
