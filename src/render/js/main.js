import riot from 'riot';
import '../tags/app.tag.js';
import '../tags/util/fontawesome.tag.js';
import '../tags/util/notification.tag.js';
import '../tags/versions/index.tag.js';
import '../tags/businessman/index.tag.js';
import '../tags/markdown/index.tag.js';
import '../tags/markdown/editor.tag.js';
import '../tags/markdown/viewer.tag.js';
import '../tags/redmine/index.tag.js';
import '../tags/redmine/products.tag.js';
import '../tags/redmine/issues.tag.js';
import '../tags/chartjs/index.tag.js';
import '../tags/chartjs/chart_bar.tag.js';
import '../tags/chartjs/chart_line.tag.js';
import '../tags/chartjs/chart_pie.tag.js';
riot.mount('app');

import { install } from 'businessman'
install('../js/businessman/worker.js' )