import { ADD_ENTRY, DELETE_ENTRY } from "../utils/constants";
import { defaultFileSystem } from "../utils/defaultFileSystem";
import { AddEntry, DeleteEntry } from "../utils/fileSystem";

const fileSystemReducer = (data = defaultFileSystem, action) => {
  switch (action.type) {
    case ADD_ENTRY: {
      const newEntry = action.payload;
      return AddEntry(data, newEntry);
    }
    case DELETE_ENTRY: {
      return DeleteEntry(data, action.payload);
    }
    default:
      return data;
  }
};

export default fileSystemReducer;
