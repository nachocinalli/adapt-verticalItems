import React from 'react';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function VerticalItems({
  top,
  _items,
  bottom,
  ...props
}) {
  return (
    <div className='component__inner verticalitems__inner'>
      <templates.header {...props} />
      <div className='component__widget verticalitems__widget'>
        {top && (
          <div className='verticalitems__top u-clearfix'>
            <div className='verticalitems__top-inner'>{html(compile(top))}
            </div>
          </div>
        )}
        <div className='verticalitems__container' role='list'>
          {_items.map(({ title, body, _icon, _graphic, _isVisited, _classes }, _index) => (
            <div
              className={classes([
                'verticalitems__item',
                'u-clearfix',
                _isVisited && 'is-visited',
                _graphic.src && 'has-image',
                _classes
              ])}
              key={_index}
              data-index={_index}
              role="listitem"
            >

              <div className={classes(['verticalitems__item-icon', _isVisited ? 'anim' : 'is-hidden'])}>

                <div className={classes([
                  'icon',
                  _icon._classes
                ])}>
                  {_icon.src && (
                    <img src={_icon.src} alt={_icon.alt} />
                  )}
                </div>

              </div>
              <div className={classes(['verticalitems__item__content', _isVisited ? 'anim' : 'is-hidden'])}>

                {title && (
                  <div className='verticalitems__item__content-title'>
                    {html(compile(title))}
                  </div>
                )}
                {body && (
                  <div className='verticalitems__item__content-body'>
                    {html(compile(body))}
                  </div>
                )}
                {_graphic.src && (
                  <div className='verticalitems__item__content-graphic'>
                    <img src={_graphic.src} alt={_graphic.alt} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {bottom && (
          <div className='verticalitems__bottom u-clearfix'>
            <div className='verticalitems__bottom-inner'>{html(compile(bottom))}</div>
          </div>
        )}
      </div>
    </div>
  );
}
