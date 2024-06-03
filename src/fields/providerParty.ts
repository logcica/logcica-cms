import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const providerPartyField: Field = {
  name: 'provider',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default providerPartyField;