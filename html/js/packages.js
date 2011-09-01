var providers = {
  'vodacom': 'Vodacom',
  'cellc': 'Cell C',
  'mtn': 'MTN'
};

/***
 * Vodacom codes:
 * u49s -- top up 49s
 * t120 -- talk 120
 * st120s -- smart talk 120s
 * e120m -- everyday 120 per minute (or 's' per second)
 * e120s -- everday offpeak 120s
 **/

var packages = 
{"vodacom": {
  /* http://www.vodacom.co.za/vodacom/Deals/Contract/Top+Up+Price+Plans/ */
  'u49':   { 'name': 'Top Up 49',           'cost': 49.00,    'airtime': 49},
  'u75s':  { 'name': 'Vodacom 4U 75s',      'cost': 75.00,    'airtime': 75},
  'u75':   { 'name': 'Top Up 75',           'cost': 75.00,    'airtime': 75},
  'u99':   { 'name': 'Vodacom 4 Less 99',   'cost': 99.00,    'airtime': 99},
  'u135':  { 'name': 'Top Up 135',          'cost': 135.00,   'airtime': 135},
  'u135s': { 'name': 'Top Up 135 S',        'cost': 135.00,   'airtime': 135},
  'u199':  { 'name': 'Vodacom 4 Less 199',  'cost': 199.00,   'airtime': 199},
  'u200':  { 'name': 'Top Up 200',          'cost': 200.00,   'airtime': 200},
  'u275':  { 'name': 'Topup 275',           'cost': 275.00,   'airtime': 275},
  'u315s': { 'name': 'Top Up 315 S',        'cost': 315.00,   'airtime': 315},
  'u315':  { 'name': 'Top Up 315',          'cost': 315.00,   'airtime': 315},
  'u400s': { 'name': 'Top Up 400 S',        'cost': 400.00,   'airtime': 400},
  'u500':  { 'name': 'Top Up 500',          'cost': 500.00,   'airtime': 500},
  'u590':  { 'name': 'Top Up 590',          'cost': 590.00,   'airtime': 590},
  'u1000': { 'name': 'Top Up 1000',         'cost': 1000.00,  'airtime': 1000},

  /* http://www.vodacom.co.za/vodacom/Deals/Contract/Contract+monthly+Plans */
  /*'': {'name':'4U Contract','cost':'0.00','airtime':'0'}, 
  '': {'name':'Machine-to-Machine Lite','cost':'5.00'},
  '': {'name':'Machine-to-Machine Chip Lite','cost':'7.50','airtime':''},
  '': {'name':'Machine-to-Machine Data','cost':'7.50','airtime':''},
  '': {'name':'Data Messenger Lite','cost':'10.00','airtime':0},
  '': {'name':'Machine-to-Machine Chip Data','cost':'10.00','airtime':''},
  '': {'name':'Machine-to-Machine Chip Extended','cost':'30.00','airtime':''},
  '': {'name':'Messenger','cost':'35.00','airtime':0},
  '': {'name':'Data Messenger','cost':'39.00','airtime':0},
  '': {'name':'Data Messenger Plus','cost':'85.00','airtime':0},
  '': {'name':'Machine-to-Machine Pro','cost':'85.00','airtime':''},*/
  'familys':      { 'name':'Family Call S',            'cost':'99.00',    'airtime':0},
  'allday100':    { 'name':'AllDay 100',               'cost':'100.00',   'minutes': 100},
  'e120s':        { 'name':'Everyday Off-Peak 120 S',  'cost':'135.00',   'offpeak-airtime':'120'},
  'e120':         { 'name':'Everyday Off-Peak 120',    'cost':'135.00',   'offpeak-airtime':'120'},
  'businesss':    { 'name':'Business Call S',          'cost':'185.00',   'airtime':0, 'weekend-minutes': 20},
  'business':     { 'name':'Business Call',            'cost':'185.00',   'airtime':0, 'weekend-minutes': 20},
  't75s':         { 'name':'Talk 75 S',                'cost':'189.00',   'airtime':'75', 'weekend-minutes': 20},
  'frequents':    { 'name':'Frequent Call S',          'cost':'230.00',   'airtime':0, 'weekend-minutes': 20},
  'frequent':     { 'name':'Frequent Call',            'cost':'230.00',   'airtime':0, 'weekend-minutes': 20},
  't120s':        { 'name':'Talk 120 S',               'cost':'300.00',   'airtime':'120', 'weekend-minutes': 20},
  't130':         { 'name':'Talk 130',                 'cost':'315.00',   'airtime':'130', 'weekend-minutes': 20},
  't240':         { 'name':'Talk 240',                 'cost':'430.00',   'airtime':'240', 'weekend-minutes': 60},
  't200s':        { 'name':'Talk 200 S',               'cost':'430.00',   'airtime':'200', 'weekend-minutes': 60},
  'st120s':       { 'name':'Smart Talk 120 S',         'cost':'450.00',   'airtime':'120', 'weekend-minutes': 20},
  't350':         { 'name':'Talk 350',                 'cost':'630.00',   'airtime':'350', 'weekend-minutes': 60},
  'corporate500': { 'name':'Corporate 500',            'cost':'730.00',   'airtime':'500'},
  't500':         { 'name':'Talk 500',                 'cost':'800.00',   'airtime':'500', 'weekend-minutes': 180},
  'st500s':       { 'name':'Smart Talk 500 S',         'cost':'925.00',   'airtime':'500', 'weekend-minutes': 180},
  't1000s':       { 'name':'Talk 1000 S',              'cost':'1540.00',  'airtime':'1000', 'weekend-minutes': 180}
}, "mtn": {
  /* mtn anytime; treat bundle rates as free minutes */
 'any50' :  {'name':'AnyTime 50',    'minutes': 50 /  2.30 ,    'cost': 50,    'freesms': 25 ,      'call': 2.85},
 'any100':  {'name':'AnyTime 100',   'minutes': 100  /  2.30 ,  'cost': 100 ,  'freesms': 25 ,      'call': 2.85},
 'any200':  {'name':'AnyTime 200',   'minutes': 200  /  2.30 ,  'cost': 200 ,  'freesms': 25 ,      'call': 2.85},
 'any350':  {'name':'AnyTime 350',   'minutes': 350  /  1.95 ,  'cost': 350 ,  'freesms': 50 ,      'call': 2.35},
 'any500':  {'name':'AnyTime 500',   'minutes': 500  /  1.95 ,  'cost': 500 ,  'freesms': 50 ,      'call': 2.35},
 'any750':  {'name':'AnyTime 750',   'minutes': 750  /  1.60 ,  'cost': 750 ,  'freesms': 100 ,     'call': 1.75},
 'any1200': {'name':'AnyTime 1200',  'minutes': 1200 /  1.60 ,  'cost': 1200,  'freesms': 200.00 ,  'call': 1.60},
 'any1500': {'name':'AnyTime 1500',  'minutes': 1500 /  1.50 ,  'cost': 1500,  'freesms': 500.00 ,  'call': 1.50},
 'off50':  {'name': 'Off Peak 50',   'airtime': 50,             'cost': 50,    'freesms': 25,       'offpeak': 0.95,  'peak': 2.5},
 'off100': {'name': 'Off Peak 100',  'airtime': 100,            'cost': 100,   'freesms': 25,       'offpeak': 0.95,  'peak': 2.5},
 'off200': {'name': 'Off Peak 200',  'airtime': 200,            'cost': 200,   'freesms': 25,       'offpeak': 0.95,  'peak': 2.5},

},"cellc": {

  /*
  'winc': {
    'name': 'WINC Topup',
    'price': ,
    'data': 10,
    'sms': 30,
    'call': 1.5,
    'sms': 0.5,
    'url': 'http://www.cellc.co.za/packages/winc-top-up'
  },*/

  'valuechat': {
    'name': 'valuechat',
    'contract': 1,
    'setup': 114,
    'cost': 0,
    'airtime': 0,
    'peak2cellc': 1.6,
    'peak': 1.75,
    'peak2telkom': 1.6,
    'sms-peak': 0.8,
    'offpeak2cellc': 0.95,
    'offpeak': 1.1,
    'offpeak2telkom': 0.95,
    'sms-offpeak': 0.34,
    'family-peak2cellc': 1.5,
    'family-offpeak2cellc': 0.75,
  }

    

}};

/* http://www.cellc.co.za/packages/businesschat */
[['standard',  185,   0,     1.65,  2,  1.15,  0.8,  0.95,  1.1,  0.95,  0.36],
 ['400',       650,   400,   1.43,  1.79,  1.15,  0.8,  0.95,  1.1,  0.95,  0.36],
 ['700',       1100,  700,   1.43,  1.75,  1.15,  0.8,  0.95,  1.1,  0.95,  0.36],
 ['1000',      1500,  1000,  1.43,  1.7,  0.99,  0.8,  0.95,  1.1,  0.95,  0.36]
 ].forEach(function(row) {
  packages['cellc']['businesschat'+row[0]] = $.extend({}, row[2], {
  'name': 'businesschat'+row[0],
  'contract': 1,
  'setup': 114,
  'cost': row[1],
  'airtime': row[2],
  'peak2cellc': row[3],
  'peak': row[4],
  'peak2telkom': row[5],
  'sms-peak': row[6],
  'offpeak2cellc': row[7],
  'offpeak': row[8],
  'offpeak2telkom': row[9],
  'sms-offpeak': row[10],
  });
});

/* http://www.cellc.co.za/packages/activechat */
[['100', 250, 100],
 ['220', 399, 220]].forEach(function(row) {
  packages['cellc']['activechat'+row[0]] = $.extend({}, row[2], {
  'name': 'activechat'+row[0],
  'contract': 1,
  'setup': 114,
  'cost': row[1],
  'airtime': row[2],
  'family-peak2cellc': 1.5,
  'family-peak': 1.65,
  'family-offpeak2cellc': 0.75,
  'peak2cellc': 1.7,
  'peak': 2.23,
  'peak2telkom': 1.7,
  'sms-peak': 0.8,
  'offpeak2cellc': 0.95,
  'offpeak': 1.15,
  'offpeak2telkom': 0.95,
  'sms-offpeak': 0.36,
  });
});

/* http://www.cellc.co.za/packages/casualchat */
[['sms', 115, {'freesms': 200}],
 ['100', 115, {'offpeak-airtime': 100}],
 ['anytime', 130, {'airtime': 50}]
].forEach(function(row) {
  packages['cellc']['casualchat'+row[0]] = $.extend({}, row[2], {
  'name': 'casualchat'+row[0],
  'contract': 1,
  'setup': 114,
  'cost': row[1],
  'family-peak2cellc': 1.5,
  'family-peak': 1.75,
  'family-offpeak2cellc': 0.75,
  'peak2cellc': 1.8,
  'peak': 2.7,
  'peak2telkom': 2.3,
  'sms-peak': 0.8,
  'offpeak2cellc': 0.9,
  'offpeak': 1.0,
  'offpeak2telkom': 0.95,
  'sms-offpeak': 0.36,
  });
});

/* http://www.cellc.co.za/packages/controlchat */
[[50, 50, 25], [75, 85, 25], [100, 115, 100], [125, 145, 100], [150, 175, 100],
[175, 205, 100], [200, 235, 100], [225, 265, 100], [250, 295, 100], [300, 350, 100],
[350, 410, 100], [400, 470, 100], [450, 530, 100], [500, 600, 100], [600, 725, 100],
[700, 850, 100]].forEach(function(row) {
  var opt = {
    'cost': row[0],
    'airtime': row[1],
    'freesms': row[2],
    'contract': 12, 'setup': 114, 'url': 'http://www.cellc.co.za/packages/controlchat'
  };

  // monthly, airtime, sms
  [['standard',   1.5,  2.5,   0.75,  1.3,  2.5,  2.85,  2.5,  0.8,  1.4,   1.6,   1.4,   0.34],
   ['allday',     1.5,  1.5,   1.5,   1.5,  1.5,  1.5,   1.5,  0.5,  1.5,   1.5,   1.5,   0.5],
   ['persecond',  1.5,  2.99,  0.75,  1.0,  3.2,  3.5,   3.2,  0.8,  1.05,  1.30,  1.05,  0.34]
  ].forEach(function(type) {
    packages['cellc']['control'+row[0]+type[0]] = $.extend({}, opt,{
      'name': 'controlchat'+row[0]+' '+type[0],
      'family-peak2cellc': type[1],
      'family-peak': type[2],
      'family-offpeak2cellc': type[3],
      'family-offpeak': type[4],
      'peak2cellc': type[5],
      'peak': type[6],
      'peak2telkom': type[7],
      'sms-peak': type[8],
      'offpeak2cellc': type[9],
      'offpeak': type[10],
      'offpeak2telkom': type[11],
      'sms-offpeak': type[12]
    });
  });
});


// Vodacom phone discounts (in store)
var discounts = [
  /* from vodacom store */
  [25, 'u49'],
  [25, 'u75s'],
  [55, 'u135'],
  [40, 'u135s'],
  [71, 'u200s'],
  [90, 'u275s'],
  [126, 'u315'],
  [106, 'u315s'],
  [136, 'u400s'],
  [141, 'u500s'],
  [151, 'u590'],
  [161, 'u1000'],
  [86, 'e120m'],
  [76, 'e120s'],
  [74, 't75'],
  [131, 't120'],
  [126, 't130'],
  [141, 't200'],
  [141, 't240'],
  [161, 't350'],
  [165, 't500'],
  [261, 't1000'],
];

for (var k = 0; k < discounts.length; k++) {
  if (packages['vodacom'][discounts[k][1]]) {
    packages['vodacom'][discounts[k][1]]['no-phone'] = discounts[k][0];
  }else{
    console.log('Could not find package for vodacom no-phone discount: '+discounts[k][1]);
  }
}
