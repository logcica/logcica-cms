import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const brokerPartyField: Field = {
  name: 'broker',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default brokerPartyField;