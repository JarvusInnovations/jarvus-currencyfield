Ext.define('Jarvus.form.field.CurrencyInput', function() {
    var stripRe = new RegExp('^\s*'+Ext.String.escapeRegex(Ext.util.Format.currencySign));

    function _inputToCents(input) {
        return input.replace(stripRe, '').trim() * 100;
    }

    return {
        extend: 'Ext.field.TextInput',
        xtype: 'jarvus-currencyinput',

        /**
         * Body copied from Ext.field.Input and adapted to parse out currency format
         */
        getValue: function() {
            var inputElement = this.inputElement;

            if (inputElement) {
                this._value = _inputToCents(inputElement.dom.value);
            }

            return this._value;
        },

        /**
         * Body copied from Ext.field.Input and adapted to convert into currency format
         */
        updateValue: function(value) {
            return this.callParent([Ext.util.Format.currency(value / 100)]);
        },

        /**
         * Re-render DOM value on blur to force format
         */
        onBlur: function() {
            this.updateValue(this.getValue());
            this.callParent(arguments);
        }
    };
});