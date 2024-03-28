import { Field } from 'payload/types';
import { partyCommonFields } from './CustomFields';

const sellerPartyField: Field = {
  name: 'seller',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
};

export default sellerPartyField;