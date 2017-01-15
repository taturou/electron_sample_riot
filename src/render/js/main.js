import riot from 'riot';
import '../tags/app.tag.js';
import '../tags/versions/index.tag.js';
import '../tags/businessman/index.tag.js';
import '../tags/util/fontawesome.tag.js';
import '../tags/markdown/index.tag.js';
import '../tags/markdown/editor.tag.js';
import '../tags/markdown/viewer.tag.js';
riot.mount('app');

import { install } from 'businessman'
install('js/businessman/worker.js' )