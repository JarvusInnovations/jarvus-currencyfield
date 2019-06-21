Ext.define('Jarvus.form.field.Currency', {
    extend: 'Ext.field.Text',
    xtype: 'jarvus-currencyfield',
    requires: [
        'Jarvus.form.field.CurrencyInput'
    ],

    config: {
        component: {
            xtype: 'jarvus-currencyinput'
        }
    },

    /**
     * Disable Ext.field.Text implementation that re-applies value to component during input
     */
    onInput: Ext.emptyFn,

    /**
     * Read DOM value into field on blur
     */
    onBlur: function() {
        this.setValue(this.getComponent().getValue());
        this.callParent(arguments);
    }
});