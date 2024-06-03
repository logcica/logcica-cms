import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const producerPartyField: Field = {
  name: 'producer',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default producerPartyField;