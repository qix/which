
for (provider in packages) {
  for (code in packages[provider]) {
    pkg = packages[provider][code];

    ['setup', 'airtime', 'minutes', 'freesms'].forEach(function(k) {
      if (!pkg[k]) pkg[k] = 0;
    });

    /***
     * If some values are missing copy them from the main value
     **/
    var copy = {
      'offpeak': 'call', 'peak': 'call',
      'sms-offpeak': 'sms', 'sms-peak': 'sms', 
      'offpeak2voda': 'call2voda', 'peak2voda': 'call2voda',
    };

    for (var k in copy) {
      if (!pkg[k]) {
        pkg[k] = pkg[copy[k]];
      }
    }

    /***
     * Fill in provider specific rates and average
     **/
    ['sms-peak', 'sms-offpeak', 'offpeak', 'peak'].forEach(function(mode) {
      var total = 0;
      ['8ta', 'voda', 'cellc', 'mtn'].forEach(function(p) {
        if (!pkg[mode+'2'+p]) {
          pkg[mode+'2'+p] = pkg[mode];
        }
        total += pkg[mode+'2'+p];
      });
      pkg[mode+'2'] = sprintf('%.2f', total / 4);
    });

    /***
     * Work out some R/ magic
     **/
    ['peak', 'offpeak', 'sms-peak', 'sms-offpeak'].forEach(function(mode) {
      pkg['min-'+mode+'2'] = (pkg['airtime'] || 0) / pkg[mode+'2'];
      pkg['r-'+mode+'2'] = pkg['monthly'] / pkg['min-'+mode+'2'];
    });

    if (pkg['offpeak-airtime']) {
      pkg['min-offpeak2'] = (pkg['offpeak-airtime'] || 0) / pkg['offpeak2'];
      pkg['min-sms-offpeak2'] = (pkg['offpeak-airtime'] || 0) / pkg['sms-offpeak2'];
    }

    pkg['min-sms-offpeak2'] += pkg['freesms'] || 0;
    pkg['min-sms-peak2'] += pkg['freesms'] || 0;

    ['peak', 'offpeak', 'sms-peak', 'sms-offpeak'].forEach(function(mode) {
      pkg['r-'+mode+'2'] = pkg['min-'+mode+'2'] ? (pkg['cost'] / pkg['min-'+mode+'2']) : 0;
    });

    packages[provider][code] = pkg;
  }
}
