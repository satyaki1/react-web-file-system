export const getNewItemId = () => {
  const fileSystemJSON = localStorage.getItem("fileSystem") ?? {};
  const allFileIndexes = Object.keys(JSON.parse(fileSystemJSON));
  return allFileIndexes[allFileIndexes.length - 1] + 1;
};

export const getFileSystemId = (path, fileSystem) => {
  for (let index in fileSystem) {
    if (fileSystem.hasOwnProperty(index) && fileSystem[index].path === path) {
      return index;
    }
  }
};
