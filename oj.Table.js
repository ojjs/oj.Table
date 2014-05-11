// oj.Table.js

(function(){

// Create plugin
var plugin = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {}

  var Table = oj.createType('Table', {
    base: oj.CollectionView,
    constructor: function(){
      var arg, args, options, rows, _j, _len1, _ref2, _ref3, _ref4,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this.el = oj(function(){
        return oj.table();
      });
      if (options.el != null){
        this.el = oj.argumentShift(options, 'el');
      }
      if ((_ref3 = options.each) == null){
        options.each = function(model, cell){
          var v, values, _j, _len1, _results;

          values = (oj.isString(model)) || (oj.isNumber(model)) || (oj.isBoolean(model)) ? [model] : (oj.isEvent(model)) && typeof model.attributes === 'object' ? _values(model.attributes) : _values(model);
          _results = [];
          for (_j = 0, _len1 = values.length; _j < _len1; _j++){
            v = values[_j];
            _results.push(cell(v));
          }
          return _results;
        };
      }
      oj.Table.base.constructor.apply(this, [options]);
      for (_j = 0, _len1 = args.length; _j < _len1; _j++){
        arg = args[_j];
        if (!oj.isArray(arg)){
          throw new Error('oj.Table: array expected for row arguments');
        }
      }
      rows = (_ref4 = oj.argumentShift(options, 'rows')) != null ? _ref4 : args;
      if (rows.length > 0){
        return this.rows = rows;
      }
    },
    properties: {
      rowCount: {
        get: function(){
          return this.$trs.length;
        }
      },
      columnCount: {
        get: function(){
          var tflen, thlen, trlen;

          if ((trlen = this.$tr(0).find('> td').length) > 0){
            return trlen;
          } else if ((thlen = this.$theadTR.find('> th').length) > 0){
            return thlen;
          } else if ((tflen = this.$tfootTR.find('> td').length) > 0){
            return tflen;
          } else {
            return 0;
          }
        }
      },
      rows: {
        get: function(){
          var r, rx, _j, _ref2;

          if (this._rows != null){
            return this._rows;
          }
          this._rows = [];
          for (rx = _j = 0, _ref2 = this.rowCount; _j < _ref2; rx = _j += 1){
            r = this.$tdsRow(rx).toArray().map(function(el){
              return $(el).ojValue();
            });
            this._rows.push(r);
          }
          return this._rows;
        },
        set: function(list){
          if (!((list != null) && list.length > 0)){
            return this.clearBody();
          }
          this._rows = list;
          this.make();
        }
      },
      header: {
        get: function(){
          return this.$theadTR.find('> th').ojValues();
        },
        set: function(list){
          var _this = this;

          if (!oj.isArray(list)){
            throw new Error('oj.Table.header: array expected for first argument');
          }
          if (!((list != null) && list.length > 0)){
            return this.clearHeader();
          }
          return this.$theadTRMake.oj(function(){
            var ojml, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = list.length; _j < _len1; _j++){
              ojml = list[_j];
              _results.push(oj.th(ojml));
            }
            return _results;
          });
        }
      },
      footer: {
        get: function(){
          return this.$tfootTR.find('> td').ojValues();
        },
        set: function(list){
          var _this = this;

          if (!oj.isArray(list)){
            throw new Error('oj.Table.footer: array expected for first argument');
          }
          if (!((list != null) && list.length > 0)){
            return this.clearFooter();
          }
          return this.$tfootTRMake.oj(function(){
            var ojml, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = list.length; _j < _len1; _j++){
              ojml = list[_j];
              _results.push(oj.td(ojml));
            }
            return _results;
          });
        }
      },
      caption: {
        get: function(){
          return this.$caption.ojValue();
        },
        set: function(v){
          this.$captionMake.oj(v);
        }
      },
      $table: {
        get: function(){
          return this.$el;
        }
      },
      $caption: {
        get: function(){
          return this.$('> caption');
        }
      },
      $colgroup: {
        get: function(){
          return this.$('> colgroup');
        }
      },
      $thead: {
        get: function(){
          return this.$('> thead');
        }
      },
      $tfoot: {
        get: function(){
          return this.$('> tfoot');
        }
      },
      $tbody: {
        get: function(){
          return this.$('> tbody');
        }
      },
      $theadTR: {
        get: function(){
          return this.$thead.find('> tr');
        }
      },
      $tfootTR: {
        get: function(){
          return this.$tfoot.find('> tr');
        }
      },
      $ths: {
        get: function(){
          return this.$theadTR.find('> th');
        }
      },
      $trs: {
        get: function(){
          var _ref2;

          return (_ref2 = this._$trs) != null ? _ref2 : (this._$trs = this.$("> tbody > tr"));
        }
      },
      $colgroupMake: {
        get: function(){
          if (this.$colgroup.length > 0){
            return this.$colgroup;
          }
          t = '<colgroup></colgroup>';
          if (this.$caption.length > 0){
            this.$caption.insertAfter(t);
          } else {
            this.$table.append(t);
          }
          return this.$tbody;
        }
      },
      $captionMake: {
        get: function(){
          if (this.$caption.length > 0){
            return this.$caption;
          }
          this.$table.prepend('<caption></caption>');
          return this.$caption;
        }
      },
      $tfootMake: {
        get: function(){
          if (this.$tfoot.length > 0){
            return this.$tfoot;
          }
          t = '<tfoot></tfoot>';
          if (this.$tfoot.length > 0){
            this.$tfoot.insertBefore(t);
          } else {
            this.$table.append(t);
          }
          return this.$tfoot;
        }
      },
      $theadMake: {
        get: function(){
          if (this.$thead.length > 0){
            return this.$thead;
          }
          t = '<thead></thead>';
          if (this.$colgroup.length > 0){
            this.$colgroup.insertAfter(t);
          } else if (this.$caption.length > 0){
            this.$caption.insertAfter(t);
          } else {
            this.$table.prepend(t);
          }
          return this.$thead;
        }
      },
      $tbodyMake: {
        get: function(){
          if (this.$tbody.length > 0){
            return this.$tbody;
          }
          this.$table.append('<tbody></tbody>');
          return this.$tbody;
        }
      },
      $theadTRMake: {
        get: function(){
          if (this.$theadTR.length > 0){
            return this.$theadTR;
          }
          this.$theadMake.html('<tr></tr>');
          return this.$theadTR;
        }
      },
      $tfootTRMake: {
        get: function(){
          if (this.$tfootTR.length > 0){
            return this.$tfootTR;
          }
          this.$tfootMake.html('<tr></tr>');
          return this.$tfootTR;
        }
      }
    },
    methods: {
      make: function(){
        var model, models, row, rowViews, _j, _k, _len1, _len2, _ref2,
          _this = this;

        if (!this.isConstructed){
          return;
        }
        rowViews = [];
        if ((this.models != null) && (this.each != null)){
          models = oj.isEvent(this.models) ? this.models.models : this._models;
          for (_j = 0, _len1 = models.length; _j < _len1; _j++){
            model = models[_j];
            rowViews.push(this._rowFromModel(model));
          }
        } else if (this.rows != null){
          _ref2 = this.rows;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++){
            row = _ref2[_k];
            rowViews.push(oj(function(){
              var c, _l, _len3, _results;

              _results = [];
              for (_l = 0, _len3 = row.length; _l < _len3; _l++){
                c = row[_l];
                _results.push(oj.td(c));
              }
              return _results;
            }));
          }
        }
        if (rowViews.length > 0){
          this.$tbodyMake.oj(function(){
            var r, _l, _len3, _results;

            _results = [];
            for (_l = 0, _len3 = rowViews.length; _l < _len3; _l++){
              r = rowViews[_l];
              _results.push(oj.tr(r));
            }
            return _results;
          });
        }
        this.bodyChanged();
      },
      collectionModelAdded: function(m, c){
        var row, rx;

        rx = c.indexOf(m);
        row = this._rowFromModel(m);
        this._addRowTR(rx, oj(function(){
          return oj.tr(row);
        }));
      },
      collectionModelRemoved: function(m, c, o){
        this.removeRow(o.index);
      },
      collectionReset: function(){
        this.make();
      },
      $tr: function(rx){
        rx = rx < 0 ? rx + count : rx;
        return this.$trs.eq(rx);
      },
      $tdsRow: function(rx){
        rx = rx < 0 ? rx + count : rx;
        return this.$tr(rx).find('> td');
      },
      $td: function(rx, cx){
        rx = rx < 0 ? rx + this.rowCount : rx;
        cx = cx < 0 ? cx + this.columnCount : cx;
        return this.$tdsRow(rx).eq(cx);
      },
      row: function(rx, listOJML){
        var cx, ojml, _j, _len1;

        rx = this._bound(rx, this.rowCount, ".row: rx");
        if (listOJML != null){
          if (listOJML.length !== cellCount(rx)){
            throw new Error("oj." + this.typeName + ": array expected for second argument with length length cellCount(" + rx + ")");
          }
          for (cx = _j = 0, _len1 = listOJML.length; _j < _len1; cx = ++_j){
            ojml = listOJML[cx];
            this.$td(rx, cx).oj(ojml);
          }
        } else {
          return this.$tdsRow(rx).ojValues();
        }
      },
      cell: function(rx, cx, ojml){
        if (ojml != null){
          return this.$td(rx, cx).oj(ojml);
        } else {
          return this.$td(rx, cx).ojValue();
        }
      },
      addRow: function(rx, listOJML){
        var tr;

        if (listOJML == null){
          listOJML = rx;
          rx = -1;
        }
        rx = this._bound(rx, this.rowCount + 1, ".addRow: rx");
        if (!oj.isArray(listOJML)){
          throw new Error('oj.addRow: expected array for row content');
        }
        tr = function(){
          return oj.tr(function(){
            var o, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = listOJML.length; _j < _len1; _j++){
              o = listOJML[_j];
              _results.push(oj.td(o));
            }
            return _results;
          });
        };
        this._addRowTR(rx, tr);
      },
      _addRowTR: function(rx, tr){
        if (this.rowCount === 0){
          this.$el.oj(tr);
        } else if (rx === this.rowCount){
          this.$tr(rx - 1).ojAfter(tr);
        } else {
          this.$tr(rx).ojBefore(tr);
        }
        this.bodyChanged();
      },
      removeRow: function(rx){
        var out;

        if (rx == null){
          rx = -1;
        }
        rx = this._bound(rx, this.rowCount, ".removeRow: index");
        out = this.row(rx);
        this.$tr(rx).remove();
        this.bodyChanged();
        return out;
      },
      moveRow: function(rxFrom, rxTo){
        var insert;

        if (rxFrom === rxTo){
          return;
        }
        rxFrom = this._bound(rxFrom, this.rowCount, ".moveRow: fromIndex");
        rxTo = this._bound(rxTo, this.rowCount, ".moveRow: toIndex");
        insert = rxTo > rxFrom ? 'insertAfter' : 'insertBefore';
        this.$tr(rxFrom)[insert](this.$tr(rxTo));
        this.bodyChanged();
      },
      swapRow: function(rx1, rx2){
        var rxMax, rxMin;

        if (rx1 === rx2){
          return;
        }
        rx1 = this._bound(rx1, this.rowCount, ".swap: firstIndex");
        rx2 = this._bound(rx2, this.rowCount, ".swap: secondIndex");
        if (Math.abs(rx1 - rx2) === 1){
          this.moveRow(rx1, rx2);
        } else {
          rxMin = Math.min(rx1, rx2);
          rxMax = Math.max(rx1, rx2);
          this.moveRow(rxMax, rxMin);
          this.moveRow(rxMin + 1, rxMax);
        }
        this.bodyChanged();
      },
      unshiftRow: function(v){
        this.addRow(0, v);
      },
      shiftRow: function(){
        return this.removeRow(0);
      },
      pushRow: function(v){
        this.addRow(this.rowCount, v);
      },
      popRow: function(){
        return this.removeRow(-1);
      },
      clearColgroup: function(){
        this.$colgroup.remove();
      },
      clearBody: function(){
        this.$tbody.remove();
        this.bodyChanged();
      },
      clearHeader: function(){
        this.$thead.remove();
        this.headerChanged();
      },
      clearFooter: function(){
        this.$tfoot.remove();
        this.footerChanged();
      },
      clearCaption: function(){
        this.$capation.remove();
      },
      clear: function(){
        this.clearBody();
        this.clearHeader();
        this.clearFooter();
        return this.$caption.remove();
      },
      bodyChanged: function(){
        this._rows = null;
        this._columns = null;
        this._$trs = null;
      },
      headerChanged: function(){
        this._header = null;
      },
      footerChanged: function(){
        this._footer = null;
      },
      _rowFromModel: function(model){
        var _this = this;

        return oj(function(){
          return _this.each(model, oj.td);
        });
      },
      _bound: function(ix, count, message){
        var ixNew;

        ixNew = ix < 0 ? ix + count : ix;
        if (!(0 <= ixNew && ixNew < count)){
          throw new Error("oj." + this.typeName + message + " is out of bounds (" + ix + " in [0," + (count - 1) + "])");
        }
        return ixNew;
      }
    }
  });




  return {Table:Table};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

})(this);