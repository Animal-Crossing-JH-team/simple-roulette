import html from './item-section.html';
import { handleAddItem, handleRefreshList } from './item/events.js';
import './item-section.css';
import './item/item.css';
import { addItem, setLocalInfo } from './item/states.js';
import { storage } from './item/storage.js';

function ItemSection() {
  const $wrapper = document.querySelector('#main .item-section');
  $wrapper.innerHTML = html;

  const $refreshButton = $wrapper.querySelector('.item-section__refresh-button');
  $refreshButton.addEventListener('click', () => handleRefreshList());


  const $addButton = $wrapper.querySelector('.item-section__add-button');
  $addButton.addEventListener('click', () => {
    const newItem = addItem();
    if (!newItem) return;
    console.log(newItem)
    handleAddItem(newItem);
  });

  const initialId = storage.getItem('item_id', 0);
  const newItem = addItem();
  if (!newItem) return;
  const initialList = storage.getItem('item_lists',newItem);
  setLocalInfo(initialList, initialId);
  initialList.map((e) => {
    handleAddItem(e)
  })
}

export default ItemSection;
