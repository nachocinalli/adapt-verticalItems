import ComponentView from 'core/js/views/componentView';
import Adapt from 'core/js/adapt';
class VerticalItemsView extends ComponentView {

  postRender () {
    this.setupItems();
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
  }

  setupItems() {
    this.model.getChildren().forEach(item => {
      const $item = this.getItemElement(item);
      if (item.get('_graphic')?.src) {
        $item.find('.verticalitems__item__content-graphic').imageready(() => {
          $item.find('.verticalitems__item__content').css('min-height', $item.find('.verticalitems__item__content-graphic img').height());
        });
      }
      $item.on('inview.componentItemView', this.onInviewItem.bind(this));
    });
  }

  onInviewItem(event, visible, visiblePartX, visiblePartY) {
    if (!visible) return;
    const pos = Adapt.device.screenSize === 'small' ? 'top' : 'both';
    if (visiblePartY === pos || visiblePartY === 'both') {
      const index = $(event.currentTarget).data('index');
      const item = this.model.getItem(index);
      item.set('_isVisited', true);
      $(event.currentTarget).off('inview.componentItemView');
    }
  }

  getItemElement(item) {
    if (!item) return;
    const index = item.get('_index');
    return this.$('.verticalitems__item').filter(`[data-index="${index}"]`);
  }

  remove() {
    this.model.getChildren().forEach(item => {
      this.getItemElement(item).off('inview.componentItemView', this.onInviewItem.bind(this));
    });
    super.remove();
  }
}

VerticalItemsView.template = 'vertical-items.jsx';

export default VerticalItemsView;
