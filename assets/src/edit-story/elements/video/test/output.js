/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
/**
 * External dependencies
 */
import { renderToStaticMarkup } from 'react-dom/server';
import VideoOutput from '../output';

describe('Video output', () => {
  const baseProps = {
    element: {
      id: '123',
      type: 'video',
      mimeType: 'video/mp4',
      scale: 1,
      origRatio: 9 / 16,
      x: 50,
      y: 100,
      height: 1920,
      width: 1080,
      rotationAngle: 0,
      loop: true,
      tracks: [],
      title: 'element title',
      resource: {
        type: 'video',
        mimeType: 'video/mp4',
        id: 123,
        src: 'https://example.com/image.png',
        poster: 'https://example.com/poster.png',
        height: 1920,
        width: 1080,
        title: 'resource title',
      },
    },
    box: { width: 1080, height: 1920, x: 50, y: 100, rotationAngle: 0 },
  };

  it('should produce valid AMP output', async () => {
    await expect(<VideoOutput {...baseProps} />).toBeValidAMPStoryElement();
  });

  it('should produce valid AMP output with track', async () => {
    const props = {
      ...baseProps,
      tracks: [
        {
          track: 'https://example.com/track.vtt',
          trackId: 123,
          trackName: 'track.vtt',
          id: 'rersd-fdfd-fdfd-fdfd',
          srcLang: '',
          label: '',
          kind: 'caption',
        },
      ],
    };
    await expect(<VideoOutput {...props} />).toBeValidAMPStoryElement();
  });

  it(`uses the element's title for the title attribute`, async () => {
    const output = <VideoOutput {...baseProps} />;
    await expect(output).toBeValidAMPStoryElement();
    const outputStr = renderToStaticMarkup(output);
    expect(outputStr).toStrictEqual(
      expect.stringMatching(`title="element title"`)
    );
  });

  it(`should fall back to the resource's title if the element's title is undefined`, () => {
    const props = { ...baseProps };
    delete props.element.title;
    const output = <VideoOutput {...props} />;
    const outputStr = renderToStaticMarkup(output);
    expect(outputStr).toStrictEqual(
      expect.stringMatching(`title="resource title"`)
    );
  });

  it(`should not fall back to the resource's title if the element's title is an empty string`, () => {
    const props = { ...baseProps };
    props.element.title = '';
    const output = <VideoOutput {...props} />;
    const outputStr = renderToStaticMarkup(output);
    expect(outputStr).not.toStrictEqual(
      expect.stringMatching(`title="resource title"`)
    );
    expect(outputStr).toStrictEqual(expect.stringMatching(`title=""`));
  });

  it(`should use element's title for the alt attribute`, () => {
    const props = { ...baseProps };
    props.element.title = 'element title';
    const output = <VideoOutput {...props} />;
    const outputStr = renderToStaticMarkup(output);
    expect(outputStr).toStrictEqual(
      expect.stringMatching(`alt="element title"`)
    );
  });
});
