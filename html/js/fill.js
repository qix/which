//packages['vodacom'] = undefined;
//packages['cellc'] = undefined;
//packages['mtn'] = undefined;
//packages['8ta'] = undefined;

for (provider in packages) {
  for (code in packages[provider]) {
    pkg = packages[provider][code];

    ['setup', 'airtime', 'minutes', 'freesms', 'freedata'].forEach(function(k) {
      if (!pkg[k]) pkg[k] = 0;
    });

    /***
     * If some values are missing copy them from the main value
     **/
    var copy = {
      'peak': 'call',
      'offpeak': 'call',

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
      if (total) {
        pkg[mode+'2'] = total / 4;
      }
    });

    /***
     * Work out some R/ magic
     **/
    ['peak', 'offpeak', 'sms-peak', 'sms-offpeak'].forEach(function(mode) {
      pkg['min-'+mode+'2'] = (pkg['airtime'] || 0) / (pkg['bundle-call'] || pkg[mode+'2']);
      pkg['r-'+mode+'2'] = pkg['monthly'] / pkg['min-'+mode+'2'];
    });

    if (pkg['offpeak-airtime']) {
      pkg['min-offpeak2'] = (pkg['offpeak-airtime'] || 0) / (pkg['bundle-call'] || pkg['offpeak2']);
      pkg['min-sms-offpeak2'] = (pkg['offpeak-airtime'] || 0) / (pkg['bundle-sms'] || pkg['sms-offpeak2']);
    }

    pkg['min-offpeak2'] += pkg['minutes'] || 0;
    pkg['min-peak2'] += pkg['minutes'] || 0;

    pkg['min-sms-offpeak2'] += pkg['freesms'] || 0;
    pkg['min-sms-peak2'] += pkg['freesms'] || 0;

    ['peak', 'offpeak', 'sms-peak', 'sms-offpeak'].forEach(function(mode) {
      pkg['r-'+mode+'2'] = pkg['min-'+mode+'2'] ? (pkg['cost'] / pkg['min-'+mode+'2']) : 0;
    });

    for (var k in pkg) {
      if (!/[^0-9.]/.test(pkg[k])) {
        pkg[k] = parseFloat(pkg[k]);
      }
    }

    packages[provider][code] = pkg;
  }
}

