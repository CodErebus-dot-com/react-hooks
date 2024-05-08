import { getDestinationDirectories } from '@npm-smith/utils/file';
import { BaseOption, PkgManagerOption } from '../types';

function createBaseOptions<T extends U, U = BaseOption>(options: T[]): T[] {
  return options;
}

const destinationDirectories = getDestinationDirectories(undefined, undefined, 'single');

const destinationOptions = createBaseOptions(
  destinationDirectories.map((directory: string) => ({
    value: directory,
    label: directory,
    hint: '',
  })),
);

const pkgManagerOptions = createBaseOptions<PkgManagerOption>([
  {
    value: 'yarn',
    label: 'yarn',
    hint: 'recommended',
  },
  {
    value: 'npm',
    label: 'npm',
    hint: '',
  },
  {
    value: 'pnpm',
    label: 'pnpm',
    hint: 'recommended',
  },
]);

export { createBaseOptions, destinationDirectories, destinationOptions, pkgManagerOptions };
