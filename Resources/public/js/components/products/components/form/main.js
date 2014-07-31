/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define([], function() {

    'use strict';

    var formSelector = '#product-form';

    return {

        name: 'Sulu Product Form',

        view: true,

        templates: ['/admin/product/template/product/form'],

        header: function() {
            return {
                toolbar: {
                    template: 'default'
                }
            };
        },

        initialize: function() {
            this.saved = true;

            this.initializeValidation();

            this.bindDOMEvents();
            this.bindCustomEvents();

            this.setHeaderBar(true);

            this.render();

            this.listenForChange();
        },

        bindDOMEvents: function() {

        },

        bindCustomEvents: function() {
            this.sandbox.on('sulu.header.toolbar.save', function() {
                this.save();
            }.bind(this));

            this.sandbox.on('sulu.header.toolbar.delete', function() {
                this.sandbox.emit('sulu.products.product.delete', this.sandbox.dom.val('#id'));
            }.bind(this));

            this.sandbox.on('sulu.products.saved', function(id) {
                this.options.data.id = id;
                this.setHeaderBar(true);
                this.setHeaderInformation();
            }, this);

            // back to list
            this.sandbox.on('sulu.header.back', function() {
                this.sandbox.emit('sulu.products.list');
            }, this);

            this.sandbox.on('sulu.header.initialized', function() {
                this.setHeaderInformation();
            }, this);
        },

        initializeValidation: function() {
            this.sandbox.form.create(formSelector);
        },

        save: function() {
            if (this.sandbox.form.validate(formSelector)) {
                var data = this.sandbox.form.getData(formSelector);

                data.type = {
                    id: 1 // TODO do not hardcode
                };

                this.sandbox.emit('sulu.products.save', data);
            }
        },

        render: function() {
            this.sandbox.dom.html(this.$el, this.renderTemplate('/admin/product/template/product/form'));

            this.setHeaderInformation();

            this.initForm(this.options.data);
        },

        initForm: function(data) {
            // set form data
            var formObject = this.sandbox.form.create(formSelector);
            formObject.initialized.then(function() {
                this.setFormData(data);
            }.bind(this));
        },

        setFormData: function(data) {
            this.sandbox.form.setData(formSelector, data).then(function() {
                this.sandbox.start(formSelector);
            }.bind(this)).fail(function(error) {
                this.sandbox.logger.error("An error occured when setting data!", error);
            }.bind(this));
        },

        setHeaderInformation: function() {
            var title = 'pim.product.title';
            if (!!this.options.data && !!this.options.data.name) {
                title = this.options.data.name;
            }
            this.sandbox.emit('sulu.header.set-title', title);

            var breadcrumb = [
                {title: 'navigation.pim'},
                {title: 'pim.products.title'}
            ];
            if (!!this.options.data && !!this.options.data.number) {
                breadcrumb.push({
                    title: '#' + this.options.data.number
                });
            } else {
                breadcrumb.push({
                    title: 'pim.product.title'
                });
            }
            this.sandbox.emit('sulu.header.set-breadcrumb', breadcrumb);
        },

        // @var Bool saved - defines if saved state should be shown
        setHeaderBar: function(saved) {
            if (saved !== this.saved) {
                var type = (!!this.options.data && !!this.options.data.id) ? 'edit' : 'add';
                this.sandbox.emit('sulu.header.toolbar.state.change', type, saved, true);
            }
            this.saved = saved;
        },

        listenForChange: function() {
            this.sandbox.dom.on('#product-form', 'change', function() {
                this.setHeaderBar(false);
            }.bind(this), 'select, input');
            this.sandbox.dom.on('#product-form', 'keyup', function() {
                this.setHeaderBar(false);
            }.bind(this), 'input');
        }
    };
});