$(function() {
  var $table = $('table'),
      $thead = $table.find('thead'),
      $tbody = $table.find('tbody'),
      $popover = $('#popover');


  var calculate = function(initial) {
    $thead.empty(); $tbody.empty();

    var peakMonthly = $('#peak-monthly').val(),
        offpeakMonthly = $('#offpeak-monthly').val(),
        smsPeakMonthly = $('#sms-peak-monthly').val(),
        smsOffpeakMonthly = $('#sms-offpeak-monthly').val();

    var headers = {
      'provider': {'caption': 'Provider', 'color': 'blue'},
      'package': {'caption': 'Package', 'color': 'blue'},
      'airtime': {'caption': 'Incl (R)'},
      'minutes': {'caption': 'Mins'},
      'freesms': {'caption': 'SMS'},
      'data': {'caption': 'Data'},
      'setup': {'caption': 'Setup', 'color': 'red'},
      'monthly': {'caption': 'Monthly', 'color': 'purple'},
      'price': {'caption': 'Price'},
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
      'package', 'airtime', 'minutes', 'freesms', 'setup', 'price',
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
        if (k == 'provider' || k == 'package' || k == 'name') {
          /* do nothing */
        }else if (value === undefined) {
          value = '?';
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
        $popover.find('.content').text(JSON.stringify(data));
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

        var ps = smsPeakMonthly,
            os = smsOffpeakMonthly,
            pc = peakMonthly,
            oc = offpeakMonthly;

        var v;

        // Subtract used messages
        if (ps+os>0 && (v = pkg['freesms'])) {
          var used = v / (ps+os);
          ps -= used * v;
          os -= used * v;
          // Deal with underflows
          if (ps < 0) { os = Math.max(0,ps+os); ps = 0; }
          if (os < 0) { ps = Math.max(0,ps+os); os = 0; }
        }

        // Work out required airtime
        var airtimePeak = pkg['used-airtime-peak'] =
          pkg['peak2'] * pc +
          pkg['sms-peak2'] * ps;

        var airtimeOffpeak = pkg['used-airtime-offpeak'] =
          pkg['offpeak2'] * oc +
          pkg['sms-offpeak2'] * os;

        // Subtract free offpeak airtime
        if (v = pkg['offpeak-airtime']) {
          airtimeOffpeak = Math.max(airtimeOffpeak - v, 0);
        }

        pkg['used-airtime'] = airtimePeak + airtimeOffpeak;

        pkg['used-extra-airtime'] = Math.max(pkg['used-airtime'] - (pkg['airtime'] || 0), 0);

        pkg['monthly'] = price + pkg['used-extra-airtime'];


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
