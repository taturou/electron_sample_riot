import riot from 'riot';
import '../tags/app.tag.js';
import '../tags/process-version.tag.js';
import '../tags/businessman.tag.js';
riot.mount('app');

import { install } from 'businessman'
install('js/businessman/worker.js' )