import { copyTemplates, getDestinationDirectories } from '@npm-smith/utils/file';
import path from 'path';

const SRC_TEMPLATE = path.join('template', 'src');

const getHooksFromTemplates = () => {
  let hooks = [];
  getDestinationDirectories(undefined, SRC_TEMPLATE, 'single').map(directory => {
    if (directory !== '__tests__') {
      hooks.push(directory);
    }
  });
  return hooks;
};

const copyAndTransformHooks = () => {
  getHooksFromTemplates().map(hook => {
    copyTemplates(path.join(SRC_TEMPLATE, hook), path.join('src', hook), ['__template__']);
  });
};

copyAndTransformHooks();
