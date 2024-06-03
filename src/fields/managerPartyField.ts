import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const managerPartyField: Field = {
  name: 'manager',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default managerPartyField;