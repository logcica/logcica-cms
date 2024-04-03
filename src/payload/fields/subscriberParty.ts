import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const subscriberPartyField: Field = {
  name: 'subscriber',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default subscriberPartyField;