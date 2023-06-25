import { storage } from './storage.js';
import { ITEM_LISTS } from '../constants/storageKeys.js';

class ItemListStorage {
  getLists = () => storage.getItem(ITEM_LISTS, []);
  setLists = lists => storage.setItem(ITEM_LISTS, JSON.stringify(lists));
  clearLists = () => storage.clearItem(ITEM_LISTS);
}

export default ItemListStorage;
