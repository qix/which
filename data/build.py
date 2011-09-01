import os
import sys
import re

cmap = {}
cmap = {
  'Subscription Fee (per month)': '',
  'Vodacom to Vodacom (off-peak)': 'offpeak2voda',
  'Value Added Services (peak)': '',
  'Video Calls to Other Providers': '',
  'Video calls  to Vodacom (peak)': '',
  'General Service Calls (off-peak)': '',
  'Vodacom to Other (off-peak)': 'offpeak',
  'Video calls  to Vodacom (off-peak)': '',
  'MMS (all-day)': '',
  'Vodacom to Vodacom (peak)': 'peak2voda',
  'SMS (peak)': 'sms-peak',
  'International SMS': '',
  'Premium Rated SMS': '',
  'SMS (off-peak)': 'sms-offpeak',
  'Vodacom to Other (peak)': 'peak',
  'Value Added Services (off-peak)': '',
  'International OPCO SMS': '',
  'Video calls  to MTN (all day)': '',
  'General Service Calls (peak)': '',
  'Inclusive Minutes': 'airtime',
  'Inclusive Data': '',
  'Video Calls to Vodacom': '',
  'MORE Minutes': '',
  'Out-of-Bundle rate (Per MB)': '',
  'Data Package': '',
  'Package': '',
  'Domestic Calls': '',
  'Value Added Services': '',
  'Vodacom to Vodacom': 'call2voda',
  'General Service Calls': '',
  'Video Calls': '',
  'SMS & MMS': '',
  'Vodacom to Other': 'call'
}

print >> sys.stderr, 'Generating vodacom packages'
for code in os.listdir('vodacom'):
  print >> sys.stderr, code
  for line in file('vodacom/'+code):
    p = [x.strip() for x in line.split("\t")]
    if len(p) == 2 and cmap[p[0]]:
      key = cmap[p[0]]
      value = p[1]
      if value == 'None': value = '0'

      if p[0] == 'Inclusive Minutes': 
        if re.match(r'^R? ?[0-9]+( airtime)?$', value): key = 'airtime'
        elif re.match(r'^R? ?[0-9]+\(off-peak\)$', value): key = 'offpeak-airtime'
        elif re.match(r'^R? ?[0-9]+\(R1 per minute\)$', value): key = 'minutes'
        else: print >> sys.stderr, '* Unknown minutes type: '+value

      value = re.findall(r'([0-9.]+)', value)[0]
      print 'packages[\'vodacom\'][\''+code+'\'][\''+key+'\'] = '+value+";";


