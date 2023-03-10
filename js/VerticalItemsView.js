import ComponentView from 'core/js/views/componentView';
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
      $item.on('onscreen', this.onInviewItem.bind(this));
    });
  }

  onInviewItem(event, { onscreen, percentInview } = {}) {
    const isOffScreen = (!onscreen || percentInview < (this.model.get('_onScreenPercentInviewVertical') ?? 1));
    if (isOffScreen) return;
    const index = $(event.currentTarget).data('index');
    const item = this.model.getItem(index);
    item.set('_isVisited', true);
  }

  getItemElement(item) {
    if (!item) return;
    const index = item.get('_index');
    return this.$('.verticalitems__item').filter(`[data-index="${index}"]`);
  }

  remove() {
    this.model.getChildren().forEach(item => {
      this.getItemElement(item).off('onscreen', this.onInviewItem.bind(this));
    });
    super.remove();
  }
}

VerticalItemsView.template = 'vertical-items.jsx';

export default VerticalItemsView;
