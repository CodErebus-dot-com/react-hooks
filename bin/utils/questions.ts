import { cancel, confirm, group, select, text } from '@clack/prompts';
import { identifyPackageManager, isPotentiallyStandalone } from '@npm-smith/utils/packages';
import * as emoji from 'node-emoji';
import color from 'picocolors';
import { PACKAGE_MANAGER, PROJECT_OPTIONS } from '../types';
import { validateInput } from './helpers';
import { destinationDirectories, destinationOptions, pkgManagerOptions } from './options';

const isStandalone = isPotentiallyStandalone();

export async function renderQuestions(): Promise<PROJECT_OPTIONS> {
  return await group(
    {
      isScoped: async () =>
        (await confirm({
          message:
            'Is this going to be a scoped package? (visit https://docs.npmjs.com/cli/v10/using-npm/scope for more info)',
          initialValue: true,
        })) as boolean,
      scopeName: async ({ results }: { results: Partial<PROJECT_OPTIONS> }) =>
        results.isScoped
          ? ((await text({
              message: 'What is going to be your organization/scope name?',
              initialValue: 'my-org',
              validate: value => validateInput('scope', value),
            })) as string)
          : '',
      packageName: async () =>
        (await text({
          message: 'What is going to be your package name?',
          initialValue: 'react-hooks',
          validate: value => validateInput('packageName', value),
        })) as string,
      destination: async () =>
        !isStandalone && destinationDirectories.length
          ? ((await select({
              message: 'Where do you want to create the new package?',
              options: destinationOptions,
            })) as string)
          : '',
      pkgManager: async () =>
        identifyPackageManager() ??
        ((await select({
          message: 'Choose your favorite package manager',
          options: pkgManagerOptions,
        })) as PACKAGE_MANAGER),
    },
    {
      onCancel: () => {
        cancel(color.red(`${emoji.get('no_entry')} Operation cancelled`));
        process.exit(0);
      },
    },
  );
}
