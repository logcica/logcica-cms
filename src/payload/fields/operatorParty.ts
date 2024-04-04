import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const operatorPartyField: Field = {
  name: 'operator',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default operatorPartyField;