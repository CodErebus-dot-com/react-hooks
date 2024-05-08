export type PACKAGE_MANAGER = 'npm' | 'yarn' | 'pnpm';

export interface BaseOption {
  value: string;
  label: string;
  hint: string;
}

export interface PkgManagerOption extends BaseOption {
  value: PACKAGE_MANAGER;
  label: PACKAGE_MANAGER;
}

export type PROJECT_OPTIONS = {
  isScoped: boolean;
  scopeName: string;
  packageName: string;
  destination: string;
  pkgManager: PACKAGE_MANAGER;
};
