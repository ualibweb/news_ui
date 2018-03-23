'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    var serveStatic = require('serve-static');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: ""
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },
        less: {
            dev: {
                files: {
                    'dist/<%= pkg.name %>.css': ['src/**/*.less']
                },
                options: {
                    compress: false,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: true,
                    sourceMapFilename: 'dist/<%= pkg.name %>.css.map'
                }
            },
            build: {
                files: {
                    'dist/<%= pkg.name %>.min.css': ['src/**/*.less']
                },
                options: {
                    compress: true
                }
            }
        },
        html2js:{
            src: {
                src: 'src/**/*.tpl.html',
                dest: 'tmp/templates.js',
                module: '<%= pkg.name %>.templates'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['tmp/templates.js', 'src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        copy: {
            demo: {
                options: {
                    processContent: function (content, srcpath) {
                        return grunt.template.process(content);
                    }
                },
                files: [{
                    src: 'src/index.html',
                    dest: 'dist/index.html'
                }]
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        'dist/<%= pkg.name %>.js': ['dist/<%= pkg.name %>.js']
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
                }
            }
        },
        clean: {
            app: ['tmp/']
        },
        wiredep: {
            demo: {
                src: [
                    'src/index.html'
                ],
                ignorePath: '../',
                options: {
                    devDependencies: true
                },
                fileTypes: {
                    html: {
                        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"]([^'"]+)/gi,
                            css: /<link.*href=['"]([^'"]+)/gi
                        },
                        replace: {
                            js: '<script src="/{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="/{{filePath}}">'
                        }
                    }
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        dev_prod_switch: {
            dev: {
                options: {
                    environment: 'dev',
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            },
            live: {
                options: {
                    environment: 'prod',
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        watch: {
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:dev']
            },
            ng: {
                files: ['src/**/*.js', 'src/**/*.tpl.html'],
                tasks: ['html2js', 'jshint', 'concat', 'clean', 'ngdocs']
            },
            index: {
                files: ['src/index.html'],
                tasks: ['copy', 'dev_prod_switch:dev']
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ['dist/**/*', 'docs/**/*']
            }
        },
        connect: {
            live: {
                options: {
                    open: true,
                    keepalive: true,
                    hostname: 'localhost',
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    },
                    middleware: function(connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('./dist')
                        ];
                    }
                }
            },
            dev: {
                options: {
                    livereload: true,
                    open: true,
                    hostname: 'localhost',
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    },
                    middleware: function(connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('./dist')
                        ];
                    }
                }
            },
            docs: {
                options: {
                    livereload: true,
                    open: true,
                    hostname: 'localhost',
                    base: {
                        path: 'docs',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                startPage: 'api',
                sourceLink: true,
                title: "News UI Docs",
                titleLink: "#/api"
            },
            api: {
                src: ['src/**/*.js', '!src/**/*.spec.js'],
                title: 'API Documentation'
            }
        },
        'gh-pages': {
            options: {
                base: 'docs'
            },
            firstTarget: {
                src: ['**/*']
            }
        },
        auto_install: {
            local: {}
        }
    });

    // Register tasks
    grunt.registerTask('default', ['dev-build', 'connect:dev', 'watch']);

    grunt.registerTask('dev-build', [
        'auto_install',
        'html2js',
        'jshint',
        'less:dev',
        'concat',
        'wiredep',
        'copy',
        'clean',
        'dev_prod_switch:dev'
    ]);
    grunt.registerTask('live-build', [
        'auto_install',
        'html2js',
        'jshint',
        'ngAnnotate',
        'uglify',
        'less:build',
        'copy',
        'clean',
        'dev_prod_switch:live'
    ]);

    grunt.registerTask('docs', ['connect:docs', 'watch']);
    grunt.registerTask('demo-live', ['live-build', 'connect:live']);
};