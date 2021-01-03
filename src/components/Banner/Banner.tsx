import * as React from 'react';
import { observer } from 'mobx-react';
import { useDrag } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

import { useBannerStore } from 'store/context';

const Banner = React.forwardRef<HTMLDivElement>((_, ref) => {
  const {
    values: {
      text,
      textColor,
      textFont,
      background,
      img,
      imgHeight,
      imgWidth,
      width,
      height,
    },
  } = useBannerStore();
  const [
    paragraphRef,
    setParagraphRef,
  ] = React.useState<HTMLParagraphElement | null>(null);

  const [{ xy }, set] = useSpring<{ xy: number[] }>(() => ({ xy: [0, 0] }));
  const bind = useDrag(({ offset }) => set({ xy: offset }), {
    bounds: {
      left: 0,
      right: width - imgWidth,
      top: 0,
      bottom: height - imgHeight,
    },
  });

  const [{ paragraphXY }, paragraphSet] = useSpring<{ paragraphXY: number[] }>(
    () => ({ paragraphXY: [0, 0] })
  );

  const paragraphWidth = paragraphRef?.clientWidth || 0;
  const paragraphHeight = paragraphRef?.clientHeight || 0;

  const paragraphBind = useDrag(
    ({ offset }) => paragraphSet({ paragraphXY: offset }),
    {
      bounds: {
        left: 0,
        right: width - paragraphWidth,
        top: 0,
        bottom: height - paragraphHeight,
      },
    }
  );

  return (
    <div
      ref={ref}
      style={{
        background: background,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '16px',
        border: '1px solid black',
        overflow: 'hidden',
      }}
    >
      {img && (
        <animated.div
          {...bind()}
          style={{
            background: `url(${img}) no-repeat center`,
            backgroundPosition: 'contain',
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
            display: 'inline-block',
            position: 'absolute',
            transform: xy.interpolate(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (x, y) => `translate3d(${x}px, ${y}px, 0)`
            ),
          }}
        />
      )}
      <animated.p
        ref={setParagraphRef}
        {...paragraphBind()}
        style={{
          fontSize: textFont,
          color: textColor,
          textOverflow: 'ellipsis',
          overflowX: 'hidden',
          display: 'inline-block',
          position: 'absolute',
          transform: paragraphXY.interpolate(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (x, y) => `translate3d(${x}px, ${y}px, 0)`
          ),
        }}
      >
        {text}
      </animated.p>
    </div>
  );
});

export default observer(Banner);
