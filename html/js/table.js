$(function() {
  var $table = $('table'),
      $thead = $table.find('thead'),
      $tbody = $table.find('tbody'),
      $popover = $('#popover');


  var calculate = function(initial) {
    $thead.empty(); $tbody.empty();

    var peakMonthly = parseFloat($('#peak-monthly').val()),
        offpeakMonthly = parseFloat($('#offpeak-monthly').val()),
        smsPeakMonthly = parseFloat($('#sms-peak-monthly').val()),
        smsOffpeakMonthly = parseFloat($('#sms-offpeak-monthly').val()),
        percentTo = {
          '8ta': parseFloat($('#percent-8ta').val()) / 100.0,
          'vodacom': parseFloat($('#percent-vodacom').val()) / 100.0,
          'mtn': parseFloat($('#percent-mtn').val()) / 100.0,
          'cellc': parseFloat($('#percent-cellc').val()) / 100.0,
        };


    var headers = {
      'provider': {'caption': 'Provider', 'color': 'blue'},
      'package': {'caption': 'Package', 'color': 'blue'},
      'airtime': {'caption': 'Incl (R)'},
      'minutes': {'caption': 'Mins'},
      'freesms': {'caption': 'SMS'},
      'freedata': {'caption': 'Data'},
      'setup': {'caption': 'Setup', 'color': 'red'},
      'monthly': {'caption': 'Monthly', 'color': 'purple'},
      'price': {'caption': 'Price'},
      'data': {'caption': 'R▼'},
      'r-peak2': {'caption': 'R☎+'},
      'peak2': {'caption': '☎+'},
      'peak28ta': {'caption': '☎ 8ta (peak)'},
      'peak2cellc': {'caption': '☎ Cell C (peak)'},
      'peak2mtn': {'caption': '☎ MTN (peak)'},
      'peak2voda': {'caption': '☎ Vodacom (peak)'},
      'r-offpeak2': {'caption': 'R☎-'},
      'offpeak2': {'caption': '☎-'},
      'offpeak28ta': {'caption': '☎ 8ta (offpeak)'},
      'offpeak2cellc': {'caption': '☎ Cell C (offpeak)'},
      'offpeak2mtn': {'caption': '☎ MTN (offpeak)'},
      'offpeak2voda': {'caption': '☎ Vodacom (offpeak)'},
      'r-sms-peak2': {'caption': 'R✉+'},
      'sms-peak2': {'caption': '✉+'},
      'sms-peak28ta': {'caption': '✉ 8ta (peak)'},
      'sms-peak2cellc': {'caption': '✉ Cell C (peak)'},
      'sms-peak2mtn': {'caption': '✉ MTN (peak)'},
      'sms-peak2voda': {'caption': '✉ Vodacom (peak)'},
      'r-sms-offpeak2': {'caption': 'R✉-'},
      'sms-offpeak2': {'caption': '✉-'},
      'sms-offpeak28ta': {'caption': '✉ 8ta (offpeak)'},
      'sms-offpeak2cellc': {'caption': '✉ Cell C (offpeak)'},
      'sms-offpeak2mtn': {'caption': '✉ MTN (offpeak)'},
      'sms-offpeak2voda': {'caption': '✉ Vodacom (offpeak)'}
    };
  
    [
      'package', 'airtime',
      'minutes', 'freesms', 'freedata',
      'setup', 'price',
      'data',
      'peak2', 'offpeak2', 'sms-peak2', 'sms-offpeak2',
      'r-peak2', 'r-offpeak2', 'r-sms-peak2', 'r-sms-offpeak2'
    ].forEach(function(k) {
      headers[k]['show'] = true;
    });

    if (peakMonthly>0 || offpeakMonthly>0 || smsPeakMonthly>0 || smsOffpeakMonthly>0) {
      headers['monthly']['show'] = true;
    }else{
      headers['price']['color'] = 'purple';
    }

    var $tr = $('<tr>').appendTo($table.find('thead'));
    for (var k in headers) {
      if (headers[k]['show']) {
        $tr.append($(
              '<th class="header col-'+k+' '+(headers[k]['color']||'')+'">'+headers[k]['caption']+'</th>'
              ));
      }
    }

    var addRow = function(data) {
      var html = '<tr>';
      for (var k in headers) {
        if (!headers[k]['show']) continue;
        var value = data[k];
        if (value === undefined) {
          value = '?';
        }else if (/[^0-9.]/.test(value)) {
          /* string / do nothing */
        }else if (value == parseInt(value,10)) {
          value = parseInt(value,10);
        }else{
          value = sprintf('%.2f', parseFloat(value));
        }
        html += '<td class="col-'+k+'">'+value+'</td>';
      }
      html += '</tr>';

      var $tr = $(html).appendTo($tbody);

      $tr.find('td:first').hover(function() {
        var p = $(this).offset();
        $popover.find('.title').text(data['package']);
        $popover.find('.content').html(data['html']);
        $popover.css({
          'display': 'block',
          'left': p.left+$(this).width(),
          'top': p.top+$(this).height()/2-$popover.height()/2,
        });
      }, function() {
        $popover.hide();
      });
    }

    var noPhone = true;

    for (provider in packages) {
      for (code in packages[provider]) {
        var pkg = $.extend({}, packages[provider][code]);

        var price = parseFloat(pkg['cost'], 10);
        //if (noPhone) price -= pkg['no-phone'] || 0;

        var usage = {
          'sms-peak': smsPeakMonthly,
          'sms-offpeak': smsOffpeakMonthly,
          'peak': peakMonthly,
          'offpeak': offpeakMonthly,
          'monthly': price
        };

        pkg['html'] = '';
        var msg = function(m) {
          pkg['html'] += (pkg['html'] ? '<br>' : '') + m;
        };
        var take = function(k, used, allowed, name) {
          used = Math.min(usage[k], used, allowed);
          usage[k] -= used;
          msg(sprintf('Used <strong>%.2f</strong> out of <strong>%.2f</strong> %s', used, allowed, name));
        };
        var paid = function(amount, number, name) {
          usage['monthly'] += price;
          msg(sprintf('Paid <strong>%.2f</strong> for <strong>%.2f</strong> %s', amount, number, name));
        }

        var k, v;

        var split = function(amount, between, names, values) {
          if (!amount) return;

          var total = 0;
          if (!values) {
            values = between.map(function(k) {
              return usage[k];
            });
          }
          values.forEach(function(v) { total += v; });

          var share = Math.min(1, amount / total);

          for (var k = 0; k < between.length; k++) {
            take(between[k], values[k] * share, amount, names[k]);
          }
        };

        // Subtract service provider specific minutes
        for (k in providers) {
          split(pkg['minutes2'+k],
                  ['peak', 'offpeak'],
                  ['minutes to '+k+' during peak hours', 'minutes to '+k+' during offpeak hours'],
                  [usage['peak'] * percentTo[k], usage['offpeak'] * percentTo[k]]);
        }

        split(pkg['freesms'],
                 ['sms-peak', 'sms-offpeak'],
                 ['bundled sms during peak hours', 'bundled sms during offpeak hours']);
        

        split(pkg['minutes'],
                 ['peak', 'offpeak'],
                 ['bundled minutes during peak hours', 'bundled minutes during offpeak hours']);

        // @todo Work with sms bundles if no values
        if (!pkg['sms-peak2']) pkg['sms-peak2'] = 0;
        if (!pkg['sms-offpeak2']) pkg['sms-offpeak2'] = 0;

        // Work out required airtime
        usage['airtime-peak'] = pkg['used-airtime-peak'] =
          pkg['peak2'] * usage['peak'] +
          pkg['sms-peak2'] * usage['sms-peak'];

        usage['airtime-offpeak'] = pkg['used-airtime-offpeak'] =
          pkg['offpeak2'] * usage['offpeak'] +
          pkg['sms-offpeak2'] * usage['sms-offpeak'];

        [['peak', 'Peak airtime', 'calls'],
         ['sms-peak', 'Peak airtime', 'SMS'],
         ['offpeak', 'Offpeak airtime', 'calls'],
         ['sms-offpeak', 'Offpeak airtime', 'SMS']
        ].forEach(function(row) {
          (function(mode, name, type) {
            if (pkg[mode+'2'] * usage[mode]) {
              msg(sprintf(name+' airtime used with '+type+': %.2f @ R%.2f = <strong>%.2f</strong>', usage[mode], pkg[mode+'2'], pkg[mode+'2'] * usage[mode]));
            }
          }).apply(this, row);
        });


        // Subtract free offpeak airtime
        if (v = pkg['offpeak-airtime']) {
          take('airtime-offpeak', usage['airtime-offpeak'], v, 'bundled offpeak airtime');
        }

        usage['airtime'] = usage['airtime-peak'] + usage['airtime-offpeak'];

        // Subtract free anytime airtime
        if (v = pkg['airtime']) {
          take('airtime', usage['airtime'], v, 'bundled airtime');
        }

        if (usage['airtime']) {
          msg(sprintf('Airtime to be purchased: <strong>%.2f</strong>', usage['airtime']));
        }

        msg(sprintf('Package price is <strong>%.2f</strong>', price));

        pkg['monthly'] = price + usage['airtime'];
        if (sprintf('%.2f', pkg['monthly']) == 'NaN') console.log(usage);

        msg(sprintf('Total is <strong>%.2f</strong>', pkg['monthly']));

        if (!pkg['airtime'] && pkg['offpeak-airtime']) {
          pkg['airtime'] = pkg['offpeak-airtime']+'(offpeak)';
        }

        addRow($.extend({}, pkg, {
          'provider': providers[provider],
          'package': providers[provider]+' - '+pkg['name'],
          'price': price
        }));
      }
    }

    if (initial) $table.tablesorter();
    else $table.trigger('update');
  };

  $('#calculate').click(calculate);
  calculate(true);
});
