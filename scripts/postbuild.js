import { getDestinationDirectories, removeDir } from '@npm-smith/utils/file';
import path from 'path';

const srcCleanup = () => {
  getDestinationDirectories(undefined, 'src', 'single').map(item => {
    removeDir(path.join('src', item));
  });
};

srcCleanup();
