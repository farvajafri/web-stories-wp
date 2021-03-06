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
 * External dependencies
 */
import { useCallback, useEffect } from 'react';
import { useFeature } from 'flagged';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useAPI } from '../../app';
import { getContent } from './utils';

function StatusCheck() {
  const {
    actions: { getStatusCheck },
  } = useAPI();
  const statusCheckEnabled = useFeature('statusCheck');

  const doStatusCheck = useCallback(() => {
    if (!statusCheckEnabled) {
      return;
    }

    async function performRequests() {
      const content = getContent();

      try {
        await getStatusCheck(content);
        // eslint-disable-next-line no-console
        console.log(__('Status Check successful.', 'web-stories'));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(__('Status Check failure.', 'web-stories'));
      }
      // eslint-disable-next-line no-console
      console.log(__('Status Check finished.', 'web-stories'));
    }

    performRequests();
  }, [getStatusCheck, statusCheckEnabled]);

  useEffect(doStatusCheck);

  return null;
}
export default StatusCheck;
