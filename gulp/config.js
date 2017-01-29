const common = {
  srcDir: './src',
  distDir: './dist',
  tmpDir: './tmp',
  releaseDir: './release'
};

module.exports = {
  common: common,

  // electron main process
  main: {
    js: {
      srcDir: `${common.srcDir}/main/js`,
      distDir: `${common.distDir}/main/js`,
      tmpDir: `${common.tmpDir}/main/js`
    }
  },

  // electron render process
  render: {
    html: {
      srcDir: `${common.srcDir}/render/html`,
      distDir: `${common.distDir}/render/html`,
      tmpDir: `${common.tmpDir}/render/html`
    },
    js: {
      srcDir: `${common.srcDir}/render/js`,
      distDir: `${common.distDir}/render/js`,
      tmpDir: `${common.tmpDir}/render/js`,
      bundle: {
        entries: `${common.tmpDir}/render/js/main.js`,
        distDir: `${common.distDir}/render/js`,
        distFile: 'bundle.js'
      }
    },
    riot: {
      srcDir: `${common.srcDir}/render/tags`,
      distDir: `${common.distDir}/render/tags`,
      tmpDir: `${common.tmpDir}/render/tags`
    },
    businessman: {
      bundle: {
        entries: `${common.tmpDir}/render/js/businessman/index.js`,
        distDir: `${common.distDir}/render/js/businessman`,
        distFile: 'worker.js'
      }
    }
  },

  // release
  release: {
    appDir: `${common.distDir}`,
    electronVersion: '1.4.15',
    releaseDir: `${common.releaseDir}`
  }
};