import Adapt from 'core/js/adapt';
import VerticalItemsModel from './VerticalItemsModel';
import VerticalItemsView from './VerticalItemsView';

export default Adapt.register('verticalItems', {
  model: VerticalItemsModel,
  view: VerticalItemsView
});
