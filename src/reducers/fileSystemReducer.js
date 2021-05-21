import { addEntry, deleteEntry } from "../actions/fileSystem";
import { ADD_ENTRY, DELETE_ENTRY } from "../utils/constants";
import { defaultFileSystem } from "../utils/defaultFileSystem";

const fileSystemReducer = (data = defaultFileSystem, action) => {
  switch (action.type) {
    case ADD_ENTRY: {
      const newEntry = action.payload;
      return addEntry(data, newEntry);
    }
    case DELETE_ENTRY: {
      return deleteEntry(data, action.payload);
    }
    default:
      return data;
  }
};

export default fileSystemReducer;
