import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const customerPartyField: Field = {
  name: 'customer',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default customerPartyField;