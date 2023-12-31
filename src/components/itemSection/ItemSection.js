import html from './ItemSection.html';
import './ItemSection.css';
import './Item.css';

export default class ItemSection {
  constructor({ $target, initialState, addItem, removeItem, setCheck, setValue, setRatio, refreshList }) {
    $target.innerHTML = html;

    this.$list = $target.querySelector('.item-section__list');
    this.$count = $target.querySelector('.item-section__item-count');
    this.$addButton = $target.querySelector('.item-section__add-button');
    this.$refreshButton = $target.querySelector('.item-section__refresh-button');

    this.state = initialState;
    this.addItem = addItem;
    this.removeItem = removeItem;
    this.setCheck = setCheck;
    this.setValue = setValue;
    this.setRatio = setRatio;
    this.refreshList = refreshList;

    this.render();
    this.initEvents();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    this.$addButton.addEventListener('click', this.addItem);

    // 초기화 이벤트
    this.$refreshButton.addEventListener('click', this.refreshList);

    // 아이템 클릭 이벤트
    this.$list.addEventListener('click', e => {
      const key = Number(e.target.closest('li')?.getAttribute('data-key'));
      if (isNaN(key)) return;

      // 삭제 이벤트
      if (e.target.closest('.item-section__item-remove-button')) this.removeItem(key);

      // 체크박스 이벤트
      if (e.target.closest('.item-section__item-checkbox')) this.setCheck(key, e.target.checked);
    });

    // 아이템 입력 이벤트
    this.$list.addEventListener('input', e => {
      const key = Number(e.target.closest('li')?.getAttribute('data-key'));
      if (isNaN(key)) return;

      // 이름 입력 이벤트
      if (e.target.closest('.item-section__item-name-input')) this.setValue(key, e.target.value);

      // 비율 입력 이벤트
      const $ratio = e.target.closest('.item-section__item-ratio');
      if ($ratio) {
        const nextValue = Number($ratio.value.replace(/[^0-9.]/g, '')) || 0;
        this.setRatio(key, nextValue);
        $ratio.value = nextValue;
      }
    });
  }

  render() {
    const { state } = this;

    const listItem = ({ key, value, checked, ratio }, index) => `
      <li class="item-section__item" data-key="${key}">
        <input class="item-section__item-checkbox" type="checkbox" ${checked ? 'checked' : ''} />
        <div class="item-section__item-name">
          <span class="item-section__item-name-index">${index + 1}</span>
          <input
            class="item-section__item-name-input"
            placeholder="항목 이름"
            type="text"
            value="${value}"
            maxlength="20"
          />
        </div>
        <input
          class="item-section__item-ratio"
          placeholder="비율"
          type="text"
          value="${ratio}"
          maxlength="20"
        />
        <span class="item-section__item-remove-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20">
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </span>
      </li>
    `;

    this.$count.innerHTML = `${state.length} / 10`;
    this.$list.innerHTML = `${state.map(listItem).join('')}`;
  }
}
