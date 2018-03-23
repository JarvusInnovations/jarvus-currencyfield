Ext.define('Jarvus.form.field.Currency', {
    extend: 'Ext.field.Text',
    xtype: 'jarvus-currencyfield',

    initialize: function() {
        var me = this,
            val;

        me.callParent();

        val = me.getValue();

        if (Ext.isEmpty(val) || val===0) {
            me.setValue('');
        } else {
            me.setValue(Ext.util.Format.currency(val));
        }
    },

    onFocus: function(e) {
        var me = this,
            val = me.getValue();

        me.setValue(isNaN(val) || Ext.isEmpty(val) ? '' : val.toFixed(2));
        me.callParent(arguments);
    },

    onBlur: function(e) {
        var me = this,
            val = me.getValue();

        if (Ext.isEmpty(val) || val===0) {
            me.setValue('');
        } else {
            me.setValue(Ext.util.Format.currency(val));
        }
        me.callParent(arguments);
    },

    onKeyUp: function() {
        console.log('keyup');
        this.setValue(this.getComponent().getValue().replace(/[^0-9,.]/g, ''));
    },

    removeFormat: function (v) {
        if (Ext.isEmpty(v)) {
            return '';
        } else {
            var thousands = new RegExp(Ext.util.Format.thousandSeparator, "g");
            v = v.toString().replace(Ext.util.Format.currencySign, '').replace(thousands, '');
            if (v % 1 === 0) {
                // Return value formatted with no precision since there are no digits after the decimal
                return Ext.util.Format.number(v, '0');
            } else {
                // Return value formatted with precision of two digits since there are digits after the decimal
                return Ext.util.Format.number(v, '0.00');
            }
        }
    },

    getValue: function() {
        var me = this,
            val = me.callParent().toString();

        val = val.replace(/[^0-9,.]/g, '');
        val = me.removeFormat(val);
        val = parseFloat(val);

        return (isNaN(val)) ? null : val;
    }

});