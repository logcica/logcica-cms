import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const ownerPartyField: Field = {
  name: 'owner',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default ownerPartyField;